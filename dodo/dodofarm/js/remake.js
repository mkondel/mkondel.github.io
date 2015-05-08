//---------------------------------------------------------------
// console.log(c.toDataURL('image/png'))
//---------------------------------------------------------------
$( document ).ready(function() {
  var storage_namespace = 'dodo'
  ,   dodo=$.initNamespaceStorage(storage_namespace).localStorage
  ,   worker = new Worker('js/brain_worker.js');

  if( dodo.isEmpty() ){
    dodo.set('songs',{})
    dodo.set('brains',{})
  }

  //TODO: prolly goes in the WebWorker
  function open_brain(brain_hash){ return dodo.get('brains')[brain_hash] } // return NN

  function handle_worker_cb(data){

    switch (data.cmd) {
      case 'learning_action':
        learning_action(data.payload)
        break
      default:
        console.log('reply from web worked: '+JSON.stringify(data))
        break
      }

    function learning_action( opts ){
      $.when(
        pickle_brain(opts.json_brain)
      ).done(function(brain_hash){
        opts.data.to.add_canvas( brain_hash )
        var new_canvas = $('#canvas'+($('canvas').length-1))
        new_canvas.hide()
          .appendTo(opts.data.to)
          .fadeIn()
        opts.data.from.effect("transfer",{ to: new_canvas }, 300)
      })
    }
  }
  //TODO: turn into perfect input for NN in WebWorker?
  //TODO: make WebWorker.NN_as_JSON()

  //TODO: WebWorker reloads training set from same dodo.saved
  //TODO:    any new saves automatically picked up and used in training NN

  function pickle_brain(brain_json){
    var brain_hash = hash_it(brain_json)
    ,   brains = dodo.get('brains')
    brains[brain_hash] = brain_json
    brains['b_prime'] = brain_json
    dodo.set('brains', brains)
    return brain_hash
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
  function current_choice(){
    if( $('#A').hasClass('outlined') ){
      return [1,0]
    }else{
      return [0,1]
    }
  }
  function saving_action( opts ){

    // worker.postMessage({cmd:'stop'}); // Send data to our worker.

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
  function hash_it(m){
    return CryptoJS.SHA3( m, { outputLength: 64 } )
  }

  function load_song(song_hash){
    return dodo.get('songs')[song_hash]
  }
  function evolving_action(){
    var new_evolution = [null, null]
    ,   last_song = load_song('s_prime')
    console.log('last_song= '+JSON.stringify(last_song))

    if( typeof last_song != 'undefined' ){
      console.log('//do the evolution here...'+JSON.stringify(last_song))
      worker.postMessage({cmd:'compare_and_find_better', payload:[ last_song.input[0], last_song.input[1] ]}); // Send data to our worker.
      // var new_evolution = actual_evolution( last_song.input[0], last_song.input[1] )
    }else{
      // new_evolution = [WebWorker.new_pleasant_song(), WebWorker.new_pleasant_song()]
      new_evolution = ['WebWorker.new_pleasant_song(1)', 'WebWorker.new_pleasant_song(2)']
      console.log('both random '+new_evolution)
    }
  }
  function evolution_results(e){
    var new_evolution = e.data
    $('#A').attr('song', new_evolution[0])
    $('#B').attr('song', new_evolution[1])

    //reset the song selector back to 'A' after evoloving new A/B
    if( $('#B').hasClass('outlined') ){ $('#A').click() }
  }
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

  $('#evolve')
    .on('click',
      evolving_action)     //suppose (A > B), try to evolve (A' > A), or at least (A > A') > B

  $('#save')
    .on('click',
      {from: $('.asong'), to: $('.songs')},
      saving_action)     //saves {A,B,choice} to 'dodo.saved'

  $('#learn')
    .on('click',function(){
      worker.postMessage({cmd:'learn', payload: {from: '.songs', to: '.brains'}})
    })


      // {from: $('.songs'), to: $('.brains')},
      // learning_action) //retains curr brain, it fits all curr dodo.saved songs 'as is' at curr time


})













