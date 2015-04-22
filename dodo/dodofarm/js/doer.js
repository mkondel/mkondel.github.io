//all the misc functinos that make this page work
if (typeof DOER === 'undefined') DOER = {};
(function(DOER) { 'use strict';
  DOER.do_dodos = function(){
    random_animal(100,100)
    do_once()
  }

  DOER.print_me = function(m,id){ id?document.getElementById(id).innerHTML=m:console.log(m) }
  DOER.song_over = function(cb){ DOER.stop_this=false; cb('song_over','logs') }
  DOER.stop_this = false

  var random_animal = function(N, T, cb){
    var wrapper = function(c){ return '&#'+c+';' }
    var j = function(n){return Math.floor(Math.random() * (n+1))}
    var start_char = 128000
    var delta = 61

    var one_char = function(n){
      if(DOER.stop_this){n=0}
      if(n>0){
        DOER.print_me(wrapper(start_char+j(delta)), 'new_dodo')
        setTimeout( function(){one_char(n-1)}, T )
      }
    }
    one_char(N)
  }

  var do_once = function(){
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
})(DOER)