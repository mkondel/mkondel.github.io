// [ 'C','C#','D','D#','E','F','F#','G','G#','A','A#','B']
// input.genepool = ['C','c','D','d','E','F','f','G','g','A','a','B']
if (typeof DODO === 'undefined') DODO = {
  populate: function(input, options) {
    input.result_callback = options.result_callback
    input.result_callback('populate_dodos')

    input.genepool = typeof options.genepool != 'undefined' ? 
      options.genepool : ['C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B']
    input.select1 = options.select1
    input.select2 = options.select2
    input.optimize = options.optimize
    // input.ancestor = options.start_seed
    
    input.j = this.j
    input.n_completely_random = this.n_completely_random
    input.unique_set_one_of_each = this.unique_set_one_of_each
    //----------------------------------------------------
    input.seed = this.seed
    input.mutate = this.mutate
    input.crossover = this.one_point_crossover
    input.fitness = this.fitness_b
    input.generation = this.generation
    input.notification = this.notification

//     input.j = this.j.bind(input)
//     input.n_completely_random = this.n_completely_random.bind(input)
//     input.unique_set_one_of_each = this.unique_set_one_of_each.bind(input)

//     input.select1 = options.select1
//     input.select2 = options.select2
//     input.optimize = options.optimize
//     // input.ancestor = options.start_seed

//     input.seed = this.seed.bind(input)
//     input.mutate = this.mutate.bind(input)
//     input.crossover = this.one_point_crossover.bind(input)
//     input.fitness = this.fitness_b.bind(input)
//     input.generation = this.generation.bind(input)
//     input.notification = this.notification.bind(input)

    input.result_callback('end of populate')
    return input
  }

, seed: function() {
    // this.result_callback('seed: '+this.genepool)
    // var entity = this.unique_set_one_of_each(this.genepool)
    var entity = this.n_completely_random(this.genepool, 12)
    // console.log('entity')
    return entity
  }

, mutate: function(entity) {
    var mutant = entity.slice()
    var a=Math.floor(Math.random() * mutant.length)
    var b=Math.floor(Math.random() * this.genepool.length)
    mutant[a] = this.genepool[b]
    // this.result_callback(mutant)
    return mutant
  }

, one_point_crossover: function(mother, father){
    var x=Math.floor(Math.random() * (mother.length+father.length)/2),
        son=[].concat(mother.slice(0,x),father.slice(x)),
        daughter=[].concat(father.slice(0,x),mother.slice(x))

    return [son, daughter]
  }

, two_point_crossover: function(mother, father) {
    var len = mother.length;
    var start = Math.floor(Math.random()*len);
    var end = Math.floor(Math.random()*len); 
    if (start > end) {
      start = start^end^(end^=(start^end))
    }
    var son = [].concat(father.slice(0,start), mother.slice(start, end), father.slice(end))
    var daughter = [].concat(mother.slice(0,start), father.slice(start, end), mother.slice(end))
    return [son, daughter];
  }

, fitness_b: function(entity) {
    var random_center = this.j(this.genepool.length)
    ,   x=0

    for(var i=0; i<entity.length; i++){
      x += Math.abs(this.genepool.indexOf(entity[i]) - random_center)
    }
    var s = this.j(x) / x
    // console.log(entity + " " + s)
    return s
  }

, fitness_a: function(entity) {
    var diff = [], sum=0
    for(var i=0; i<entity.length; i++){
      diff.push(this.genepool.indexOf(entity[i]))
    }

    for(var i=0; i<diff.length; i++){
      sum += Math.pow(1.1,diff[i]-i)
    }
    return (sum-entity.length)*100000
  }

, generation: function(pop, gen, stats) {
    this.result_callback('gen '+gen)
  }

, notification: function(pop, generation, stats, isFinished) {
    if(isFinished){
      this.result_callback({'best':pop[0].entity, 'worst':pop[pop.length-1].entity})
    }else{}
  }


  // return random integer with 0 ≤ j ≤ n
, j: function(n){return Math.floor(Math.random() * (n+1));}
  // Sattolo's To shuffle an array a of n elements (indices 0..n-1):
, unique_set_one_of_each: function(a){
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
, n_completely_random: function(al, n){
    var a = []
    for(var i=n; i>0; i--){
      a.push(al[this.j(al.length-1)])
    }
    return a
  }
}