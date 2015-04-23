//all the misc functinos that make this page work
if (typeof DOER === 'undefined') DOER = {
  do_dodos: function(){
    this.random_animal(100)
    var genetic = Genetic.create()

    DODO.populate(
      genetic, 
      {
        select1:Genetic.Select1.Random, 
        select2:Genetic.Select2.FittestRandom, 
        optimize:Genetic.Optimize.Minimize,
        result_callback:PLAY.play_midi,
        genepool:PLAY.midi_genepool(21,109)
      })

    genetic.evolve({
      'iterations': Math.pow(2,9), 
      'size': Math.pow(2,9), 
      'crossover': Math.pow(2,-12), 
      'mutation': Math.pow(2,-12),
      'skip': Math.pow(2,12)

      // 'crossover': .1, 
      // 'mutation': .9, 
    })
  }

, print_me: function(m,id){ id?document.getElementById(id).innerHTML=m:console.log(m) }
, song_over: function(cb){ $('#replay').html('replay'); DOER.stop_this = false; cb('song_over','logs') }
, stop_this: false

, random_animal: function(T){
    var wrapper = function(c){ return '&#'+c+';' }
    ,   j = function(n){return Math.floor(Math.random() * (n+1))}
    ,   start_char = 128000
    ,   delta = 61

    if(!DOER.stop_this){
      setTimeout( function(){
        $('#new_dodo').html( wrapper(start_char+j(delta)) )
        DOER.random_animal(T)
      }, T )
    }
  }

}