// [ 'C','C#','D','D#','E','F','F#','G','G#','A','A#','B']
if (typeof DODO === 'undefined') DODO = {};
(function(root) { 'use strict';

  console.log('DODO loading')
  
  root.populate = function(input, options) {
    input.select1 = options.select1
    input.select2 = options.select2
    input.optimize = options.optimize
    input.notes_in_order = ['C','c','D','d','E','F','f','G','g','A','a','B']

    // return random integer with 0 ≤ j ≤ n
    input.j = function(n){return Math.floor(Math.random() * (n+1));}

    // Sattolo's To shuffle an array a of n elements (indices 0..n-1):
    input.unique_set_one_of_each = function(a){
      var n = a.length
      //for i from n − 1 downto 1 do
      for(var i=n-1; i>1; i--){
        //j ← random integer with 0 ≤ j ≤ i
        var J = this.j(i)
        //exchange a[j] and a[i]
        var temp = a[i]
        a[i] = a[J]
        a[J] = temp
      }
      return a
    }

    // To shuffle an array a of n elements (indices 0..n-1):
    input.n_completely_random = function(alphabet, n){
      var a = []
      for(var i=n; i>0; i--){
        a.push(alphabet[this.j(alphabet.length-1)])
      }
      return a
    }

    input.seed = function() {
      // console.log('seed: '+JSON.stringify(this,null,1))
      // var entity = this.n_completely_random('CcDdEFfGgAaB',12)
      var entity = this.unique_set_one_of_each(this.notes_in_order)
      // console.log('seed: '+JSON.stringify(entity))
      return entity
    }

    input.mutate = function(entity) {
      // console.log('mutate')
      return entity
    }

    input.crossover = function(mother, father){
      // console.log('crossover')
      return [mother,father]
    }

    input.fitness = function(entity) {
      var diff = [], sum=0
      for(var i=0; i<entity.length; i++){
        diff.push(this.notes_in_order.indexOf(entity[i])-i)
      }
      // console.log('fitness: '+JSON.stringify(entity)+' = '+diff)

      for(var i=0; i<diff.length; i++){
        sum += Math.abs(diff[i])*Math.pow(2,i)
      }
      return sum
    }

    input.generation = function(pop, generation, stats) {}
    input.notification = function(pop, generation, stats, isFinished) {
      if(isFinished){
        console.log('Best after '+(generation+1)+' generations: '+JSON.stringify(pop[0]))
      }else{
        console.log('best in '+generation+'_th generation is'+JSON.stringify(pop[0]))
        // console.log('worst '+JSON.stringify(pop[pop.length-1]))
      }
    }

    return input
  }

})(DODO)