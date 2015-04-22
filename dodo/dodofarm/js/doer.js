//all the misc functinos that make this page work
if (typeof DOER === 'undefined') DOER = {
  do_dodos: function(){
    this.random_animal(30,200,DOER.print_me)
    this.do_once()
  }

, print_me: function(m,id){ id?document.getElementById(id).innerHTML=m:console.log(m) }
, ascii_print: function(m,id){ id?document.getElementById(id).value=m:console.log(m) }
, song_over: function(cb){ DOER.stop_this = false; cb('song_over','logs') }
, stop_this: false

, random_animal: function(N, T, cb){
    wrapper = function(c){ return '&#'+c+';' }
    j = function(n){return Math.floor(Math.random() * (n+1))}
    start_char = 128000
    delta = 61
    one_char = function(n){
        if(DOER.stop_this){
          n=0
        }
        if(n>0){
          cb(wrapper(start_char+j(delta)), 'new_dodo')
          setTimeout( function(){one_char(n-1)}, T )
        }
      }
    one_char(N)
  }

,  do_once: function(){
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
}