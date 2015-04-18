// [ 'C','C#','D','D#','E','F','F#','G','G#','A','A#','B']
if (typeof DODO === 'undefined') DODO = {};
(function(root) { 'use strict';

  console.log('DODO loading')
  
  // return random integer with 0 ≤ j ≤ n
  var j = function(n){return Math.floor(Math.random() * (n+1));}

  // To shuffle an array a of n elements (indices 0..n-1):
  root.n_completely_random = function(alphabet, n){
    var a = []
    for(var i=n; i>0; i--){
      a.push(alphabet[j(alphabet.length-1)])
    }
    return a
  }

  // Sattolo's To shuffle an array a of n elements (indices 0..n-1):
  root.unique_set_one_of_each = function(a){
    n = a.length
    //for i from n − 1 downto 1 do
    for(var i=n-1; i>1; i--){
      //j ← random integer with 0 ≤ j ≤ i
      J = j(i)
      //exchange a[j] and a[i]
      temp = a[i]
      a[i] = a[J]
      a[J] = temp
    }
    return a
  }


  root.populate = function(input, options) {
    input.select1 = options.select1
    input.select2 = options.select2
    input.optimize = options.optimize

    input.seed = function() {
      console.log('seed')
      var r = { a:Math.random(), b:Math.random(), c:Math.random() }
      return r
    }

    input.mutate = function(entity) {
      console.log('mutate')
      return entity
    }

    input.crossover = function(mother, father){
      console.log('crossover')
      return [mother,father]
    }

    input.fitness = function(entity) {
      console.log('fitness')
      return Float;
    }

    input.generation = function(pop, generation, stats) {}
    input.notification = function(pop, generation, stats, isFinished) { if(isFinished){console.log('best '+JSON.stringify(pop[0]));console.log('worst '+JSON.stringify(pop[pop.length-1]));}}

    return input
  }

})(DODO)