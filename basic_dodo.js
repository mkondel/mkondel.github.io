// [ 'C','C#','D','D#','E','F','F#','G','G#','A','A#','B']
if (typeof DODO === 'undefined') DODO = {};
(function(root) { 'use strict';

  console.log('DODO loading')
  
  root.populate = function(input, options) {
    input.select1 = options.select1
    input.select2 = options.select2
    input.optimize = options.optimize
    // input.notes_in_order = ['C','c','D','d','E','F','f','G','g','A','a','B']

    // return random integer with 0 ≤ j ≤ n
    input.j = function(n){return Math.floor(Math.random() * (n+1));}

    // Sattolo's To shuffle an array a of n elements (indices 0..n-1):
    input.unique_set_one_of_each = function(a){
      var b = a.slice()
      var n = b.length
      //for i from n − 1 downto 1 do
      for(var i=n-1; i>1; i--){
        //j ← random integer with 0 ≤ j ≤ i
        var J = this.j(i)
        //exchange a[j] and a[i]
        var temp = b[i]
        b[i] = b[J]
        b[J] = temp
      }
      return b
    }

    // To shuffle an array a of n elements (indices 0..n-1):
    input.n_completely_random = function(alphabet, n){
      var a = []
      for(var i=n; i>0; i--){
        a.push(alphabet[this.j(alphabet.length-1)])
      }
      return a
    }

    // input.notes_in_order = input.unique_set_one_of_each(['C','c','D','d','E','F','f','G','g','A','a','B'])
    input.notes_in_order = ['C','c','D','d','E','F','f','G','g','A','a','B']

    input.seed = function() {
      // console.log('seed: '+this.notes_in_order)
      var entity = this.unique_set_one_of_each(this.notes_in_order)
      return entity
    }

    input.mutate = function(entity) {
      var mutant = entity.slice()
      var a=Math.floor(Math.random() * mutant.length)
      var b=Math.floor(Math.random() * this.notes_in_order.length)
      mutant[a] = this.notes_in_order[b]
      return mutant
    }

    // one-point crossover
    input.crossover0 = function(mother, father){
      var son=mother,
          daughter=father,
          x=Math.floor(Math.random() * mother.length)

      son = [].concat(mother.slice(0,x),father.slice(x))
      daughter = son.slice().reverse()
      return [son, daughter]
    }

    // two-point crossover
    input.crossover = function(mother, father) {
      var len = mother.length;
      var start = Math.floor(Math.random()*len);
      var end = Math.floor(Math.random()*len); 
      // console.log(start, end)  
      if (start > end) {
        var tmp = end;
        end = start;
        start = tmp;
      }
        
      var son = [].concat(father.slice(0,start), mother.slice(start, end), father.slice(end))
      var daughter = [].concat(mother.slice(0,start), father.slice(start, end), mother.slice(end))
      
      return [son, daughter];
    }

    input.fitness = function(entity) {
      var diff = [], sum=0
      for(var i=0; i<entity.length; i++){
        diff.push(this.notes_in_order.indexOf(entity[i]))
      }

      for(var i=0; i<diff.length; i++){
        sum += Math.pow(1.001,diff[i]-i)
      }
      return (sum-entity.length)*100000
    }

    input.generation = function(pop, generation, stats) {
    }

    input.notification = function(pop, generation, stats, isFinished) {
      if(isFinished){
        console.log('DODOKEY: '+input.notes_in_order)
        console.log('Best after '+(generation+1)+' generations: '+JSON.stringify(pop[0]))
        console.log('Worst after '+(generation+1)+' generations: '+JSON.stringify(pop[pop.length-1]))
      }else{
        // console.log('best in '+generation+'_th generation is '+JSON.stringify(pop[0]))
        // console.log('worst in '+generation+'_th generation is '+JSON.stringify(pop[pop.length-1]))
      }
    }

    return input
  }

})(DODO)