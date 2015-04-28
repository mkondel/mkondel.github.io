// [ 'C','C#','D','D#','E','F','F#','G','G#','A','A#','B']
// input.genepool = ['C','c','D','d','E','F','f','G','g','A','a','B']
if (typeof DODO === 'undefined') DODO = {
  populate: function(input, options) {
    input.result_callback = options.result_callback
    input.progress_callback = options.progress_callback
    // input.result_callback('populate_dodos')
    input.maths = this.maths
    
    input.genepool = typeof options.genepool != 'undefined' ? 
      options.genepool : ['C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B']
    input.select1 = options.select1
    input.select2 = options.select2
    input.optimize = options.optimize
    input.ancestors = JSON.parse(JSON.stringify(options.start_seed)) //[0: worst, 1: best]
    //--------------------------------------------------------------
    input.seed = this.seed
    input.mutate = this.mutate
    input.crossover = this.one_point_crossover
    input.fitness = this.ancestral_fitness
    input.generation = this.generation
    input.notification = this.notification

    return input
  }

, seed: function() {
    // var entity = this.maths.unique_set_one_of_each(this.genepool).slice(0,12)
    // var entity = this.maths.n_completely_random(this.genepool, 12)
    var entity = this.maths.unique_set_one_of_each(this.ancestors[1].split(''))
    // var entity = this.crossover(
    //     JSON.parse(JSON.stringify(this.ancestors[1])).split(''),
    //     JSON.parse(JSON.stringify(this.ancestors[0])).split('')
    //   )[this.j(1)]
    
    return entity
  }

, mutate: function(entity) {
    var mutant = entity.slice()
    for (var i=0; i<mutant.length; i++){
      var random_gene = this.genepool.indexOf(mutant[i]) + Math.floor(Math.random()*mutant.length) - mutant.length

      if(random_gene < 0){
        random_gene += this.genepool.length
      }else if(random_gene > this.genepool.length){
        random_gene -= this.genepool.length
      }

      mutant[i] = this.genepool[random_gene]
    }

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

, fitness_c: function(entity) {
    return this.maths.j(entity.length)/entity.length
  }

, ancestral_fitness: function(entity) {
    var random_center = this.maths.n_completely_random(this.ancestors[1].split(''), this.ancestors[1].length)
    ,   x=0

    for(var i=0; i<entity.length; i++){
      x += Math.abs(this.genepool.indexOf(entity[i]) - this.genepool.indexOf(random_center[i]))
    }
    return this.maths.sigmoid(entity.length/x)
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

, generation: function(pop, gen, stats) {}

, notification: function(pop, gen, stats, isFinished) {
    this.progress_callback({ percent:100*gen/this.configuration.iterations, stats:JSON.parse(JSON.stringify(stats)), gen: gen})
    if(isFinished){
      this.progress_callback({ percent:100, stats:JSON.parse(JSON.stringify(stats)), gen: gen})
      this.result_callback( {gen:gen, best:pop[0].entity.join(''), worst:pop[pop.length-1].entity.join('')} )
    }else{}
  }

, maths: {
    //the one...
    sigmoid: function(t) { return 1/(1+Math.exp(-t)) }
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
}