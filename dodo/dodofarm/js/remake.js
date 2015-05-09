//---------------------------------------------------------------
$( document ).ready(function() {
  var storage_namespace = 'dodo'
  ,   dodo=$.initNamespaceStorage(storage_namespace).localStorage
  ,   worker = new Worker('js/brain_worker.js');

  if( dodo.isEmpty() ){
    dodo.set('songs',{})
    dodo.set('brains',{})
  }

//---------------------------------------------------------------
  function handle_worker_cb(e){
    var data = e.data

    switch (data.cmd) {
      case 'evolutioning':
        console.log(JSON.stringify(data))
        evolution_results(data.payload)
        break
      case 'learned':
        learning_results(data.payload)
        break
      default:
        console.log('what is web worker talking about?: '+JSON.stringify(data))
        break
    }
  }
  function evolution_results(new_evolution){
    $('#A').attr('song', new_evolution[0])
    $('#B').attr('song', new_evolution[1])
    if( $('#B').hasClass('outlined') ){ $('#A').click() }   //reset the song selector back to 'A' after evoloving new A/B
  }
  function learning_results( data ){
    data.to.add_canvas(
      pickle_brain(
        data.curr_brain
      ))
    var new_canvas = $('#canvas'+($('canvas').length-1))
    new_canvas.hide()
      .appendTo(data.to)
      .fadeIn()
    data.from.effect("transfer",{ to: new_canvas }, 300)
  }

  function load_song(song_hash){
    return dodo.get('songs')[song_hash]
  }
  function open_brain(brain_hash){
    return dodo.get('brains')[brain_hash]
  }
  function pickle_brain(brain_json){
    // alert(JSON.stringify(brain_json))
    var brain_hash = hash_it(brain_json)
    ,   brains = dodo.get('brains')
    brains[brain_hash] = brain_json
    brains['b_prime'] = brain_json
    dodo.set('brains', brains)
    return brain_hash
  }

//---------------------------------------------------------------
  function saving_action( opts ){
    var new_element = $('.outlined.asong').clone()
    opts.data.from.effect("transfer",{ to: opts.data.to }, 300, function(){
      var song = {input: [$('#A').attr('song'), $('#B').attr('song')], choice: current_choice()}
      new_element
        .removeClass('outlined asong')
        .attr('id', $('#new_song'+$('.new_song').length))
        .attr('title', save_song(song) )
        .addClass('new_song')
        .appendTo(opts.data.to)
        .fadeIn()
    })
  }
  function current_choice(){
    if( $('#A').hasClass('outlined') ){
      return [1,0]
    }else{
      return [0,1]
    }
  }
  function save_song(song){
    var songs = dodo.get('songs')
    var sample = {input: [song.input], output: song.choice}
    var song_hash = hash_it(sample.input.join(''))
    songs[song_hash] = sample
    songs['s_prime'] = sample
    dodo.set('songs', songs)
    return song_hash
  }
  function hash_it(m){
    return CryptoJS.SHA3( m, { outputLength: 64 } )
  }

//---------------------------------------------------------------
  function toggle_AB(){

    //TODO: outlined highlight and 'choice' should flip [1,0] -> [0,1]

    if( !$('.asong').hasClass('outlined') ){
      $(this).toggleClass('outlined')
    }else{
      $('.asong').toggleClass('outlined')
    }
  }

//---------------------------------------------------------------
  console.log('start')                  //starto!
  worker.addEventListener('message', handle_worker_cb, false)

  // evolving_action()                     //this provides working A/B on any load of the page
  $('.asong').on('click', toggle_AB)    //when either of these is clicked on
  $('#A').click()                       //this just makes A selected and hightlighted with the outline on load

      // evolving_action)     //suppose (A > B), try to evolve (A' > A), or at least (A > A') > B
  $('#evolve')
    .on('click',
      function(){
        worker.postMessage({cmd:'evolve', payload: load_song('s_prime')})
      })

  $('#save')
    .on('click',
      {from: $('.asong'), to: $('.songs')},
      saving_action)     //saves {A,B,choice} to 'dodo.saved'

      // learning_action) //retains curr brain, it fits all curr dodo.saved songs 'as is' at curr time
  $('#learn')
    .on('click',
      function(){
        worker.postMessage({cmd:'learn', payload: {from: '.songs', to: '.brains'}})
      })


})













