$( document ).ready(function() {

$.printme = function(m){typeof console!='undefined'?console.log(m):null}

var choice = ['A','B']
,   j = function(n){return Math.floor(Math.random() * (n+1))}
,   get_ascii = function(x){ return PLAY.note_phrase_ascii($('#'+x).html().split(',')).join('') }
,   chose = function(c){
      var dics = {A:['A','B'], B:['B','A']}
      PLAY.play_ascii( get_ascii(c).split('') )
      return dics[c]
    }
,   save = function(c){
      var   da = get_ascii(c[0])
      ,   nyet = get_ascii(c[1])
      ,   hash = CryptoJS.SHA3(da+nyet, { outputLength: 64 })

      localStorage.setItem(hash, JSON.stringify( { yes:da, no:nyet } ))
    }
,   evolve = function(c){
      var   da = get_ascii(c[0])
      ,   nyet = get_ascii(c[1])
      // ,   hash = CryptoJS.SHA3(da+nyet, { outputLength: 64 })

      dodos( {yes:da, no:nyet} )
    }
,   n_completely_random = function(alphabet, n){
      var a = []
      for(var i=n; i>0; i--){
        a.push(alphabet[j(alphabet.length-1)])
      }
      return a.join('')
    }
,   unique_set_one_of_each = function(a){
      var b = a.slice()
      var n = b.length
      //for i from n − 1 downto 1 do
      for(var i=n-1; i>1; i--){
        //j ← random integer with 0 ≤ j ≤ i
        var J = j(i)
        //exchange b[J] and b[i]
        var temp = b[i]
        b[i] = b[J]
        b[J] = temp
      }
      return b
    }
,   dodos = function(ancestors){
      var genetic = Genetic.create()
      $.when(
        DODO.populate(
          genetic, 
          {
            genepool: PLAY.midi_genepool(21,109),
            select1: Genetic.Select1.Random, 
            select2: Genetic.Select2.FittestRandom, 
            optimize: Genetic.Optimize.Maximize,
            start_seed: ancestors,
            result_callback: new_gen
          }))
      .done(function(data){
        $(".loader").fadeIn()
        data.evolve({
          'iterations': Math.pow(2,10),
          'size': Math.pow(2,10),
          'crossover': Math.pow(2,-12),
          'mutation': Math.pow(2,-12)
          // 'crossover': .1,
          // 'mutation': .9,
          // 'skip': Math.pow(2,9)
        })
      })
    }
,   new_gen = function(gen){
      $('#A').html(PLAY.ascii_phrase_notes( gen['best'].split('') ).join(','))
      $('#B').html(PLAY.ascii_phrase_notes( gen['worst'].split('') ).join(','))
      $(".loader").fadeOut()
    }

$('.seeder').focus()
  .bind('keypress', function(e) {
    // if(e.keyCode==13){ //ENTER }
      var user_notes = $('.seeder').val().split('')
      $('#A').html(PLAY.ascii_phrase_notes( user_notes ).join(','))
      $('#B').html(PLAY.ascii_phrase_notes( unique_set_one_of_each(user_notes) ).join(','))
      $('.asong').fadeIn()
      $('.controls').fadeIn()
  })

$('#A').attr('title','Song A')
  .on('click',function(){ choice = chose('A') })
$('#B').attr('title','Song B')
  .on('click',function(){ choice = chose('B') })
$('#save')
  .attr('title','Save choice')
  .on('click',function(){ save(choice) })
$('#evolve')
  .attr('title','Evolve chosen')
  .on('click',function(){ evolve(choice) })


$.when(
  $(".loader").fadeOut())
.done(function(){
  $('.seeder').val(n_completely_random(PLAY.midi_genepool(21,109),12))
})


})





