//---------------------------------------------------------------
// console.log(c.toDataURL('image/png'))
//---------------------------------------------------------------
$( document ).ready(function() {
  var storage_namespace = 'dodo'
  ,   dodo=$.initNamespaceStorage(storage_namespace).localStorage

  if( dodo.isEmpty() ){
    dodo.set('songs',{})
    dodo.set('brains',{})
  }


  function learning_action( opts ){
    opts.data.to.add_canvas( Math.random().toString() )
    var new_canvas = $('#canvas'+($('canvas').length-1))
    new_canvas.hide()
      .appendTo(opts.data.to)
      .fadeIn()
    opts.data.from.effect("transfer",{ to: new_canvas }, 300, $('.new_song').remove())
  }
  function pickle_brain(brain){
    //turn NN into JSON

    //hash on JSON to get brain_hash

    //store in dodo.brains[brain_hash] = JSON_representation_of_NN

    return brain_hash
  }

  function save_song(song){
    //turn song into stortoggle_able sample = {input:, output:}
    var songs = dodo.get('songs')
    var sample = {input: [song.a, song.b], output: song.choice}
    var song_hash = hash_it(sample.input.join(''))
    songs[song_hash] = sample
    songs['s_prime'] = sample
    dodo.set('songs', songs)
    return song_hash
  }
  function saving_action( opts ){
    var new_element = $('.outlined.asong').clone()
    opts.data.from.effect("transfer",{ to: opts.data.to }, 300, function(){

      //TODO: set and toggle with actual 'choice'
      var song = {a: $('#A').attr('song'), b: $('#B').attr('song'), choice: [1,0]}

      new_element
        .removeClass('outlined asong')
        .attr('id', $('#new_song'+$('.new_song').length))
        .attr('title', save_song(song) )
        .addClass('new_song')
        .appendTo(opts.data.to)
        .fadeIn()
    })
  }
  function new_random_song(){
    return Math.floor(Math.random()*11)
  }
  function hash_it(m){
    return CryptoJS.SHA3( m, { outputLength: 64 } )
  }
  function open_brain(brain_hash){
    return dodo.get('brains')[brain_hash]  // return NN
  }
  function actual_evolution( good_song, bad_song ){
    var brain = open_brain('b_prime')
    console.log('brain')
    if( brain ){
      console.log('actual_evolution: found a brain, evolving...')
    }else{
      console.log('actual_evolution: no brains, learn at least once to evolve')
    }

    return [ hash_it(good_song.toString()), hash_it(bad_song.toString()) ]
  }
  function load_song(song_hash){
    return dodo.get('songs')[song_hash]
  }
  function evolving_action(){
    var new_evolution = [null, null]
    ,   last_song = load_song('s_prime')
    console.log('alst_song= '+JSON.stringify(last_song))

    if( typeof last_song != 'undefined' ){
      console.log('//do the evolution here...')
      var new_evolution = actual_evolution( last_song.input.join(''), new_random_song() )
    }else{
      new_evolution = [new_random_song(), new_random_song()]
      console.log('both random '+new_evolution)
    }

    $('#A').attr('song', new_evolution[0])
    $('#B').attr('song', new_evolution[1])
    console.log('//rate ONE vs TWO using last used brain', new_evolution[0], new_evolution[1])

    //reset the song selector back to 'A' after evoloving new A/B
    if( $('#B').hasClass('outlined') ){ $('#A').click() }
  }
  function toggle_AB(){
    if( !$('.asong').hasClass('outlined') ){
      $(this).toggleClass('outlined')
    }else{
      $('.asong').toggleClass('outlined')
    }
  }
  console.log('start')                  //starto!
  $('.asong').on('click', toggle_AB)    //when either of these is clicked on, outlined highlight and 'choice' should flip [1,0] -> [0,1]
  evolving_action()                     //this provides working A/B on any load of the page
  $('#A').click()                       //this just makes A selected and hightlighted with the outline on load
  $('#evolve').on('click', evolving_action)                                       //if A > B, try to evolve (A' > A), or at least (A > A') > B
  $('#save').on('click', {from: $('.asong'), to: $('.songs')}, saving_action)     //saves {A,B,choice} to 'dodo.saved'
  $('#learn').on('click', {from: $('.songs'), to: $('.brains')}, learning_action) //take away all saved songs, find a new brain that fits all these samples

})











