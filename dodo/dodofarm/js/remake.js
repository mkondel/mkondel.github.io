//---------------------------------------------------------------
// console.log(c.toDataURL('image/png'))
//---------------------------------------------------------------
$( document ).ready(function() {
  var storage_namespace = 'dodo'
  ,   ns=$.initNamespaceStorage(storage_namespace).localStorage

  if( ns.isEmpty() ){
    ns.set('saved',{})
    ns.set('brains',{})
  }

  function saving_action( opts ){
    var new_element = $('.outlined.asong').clone()
    opts.data.from.effect("transfer",{ to: opts.data.to }, 300, function(){
      new_element
        .removeClass('outlined asong')
        .attr('id', $('#new_song'+$('.new_song').length))
        .addClass('new_song')
        .appendTo(opts.data.to)
        .fadeIn()
    })
  }
  function learning_action( opts ){
    opts.data.to.add_canvas( Math.random().toString() )
    var new_canvas = $('#canvas'+($('canvas').length-1))
    new_canvas.hide()
      .appendTo(opts.data.to)
      .fadeIn()
    opts.data.from.effect("transfer",{ to: new_canvas }, 300, $('.new_song').remove())
  }
  function evolving_action(){
    console.log('//do the evolution')
    // if( have brain ){
    //   use brain in evolution of songs
    // }else{
    //   var one = new_random_song()
    //   ,   two = new_random_song()
    // }

    console.log('//rate ONE vs TWO using last used brain')
    // var rated = A_vs_B(one, two)
    // $('#A').attr('foobar', rated['A'])
    // $('#B').attr('foobar', rated['B'])

    //reset the song selector back to 'A' after evoloving new A/B
    if( $('#B').hasClass('outlined') ){ $('#A').click() }
  }
  function AB(){
    if( !$('.asong').hasClass('outlined') ){
      $(this).toggleClass('outlined')
    }else{
      $('.asong').toggleClass('outlined')
    }
  }

  function open_brain(brain_hash){
    retrun ns.get('brain')[brain_hash]  // return NN
  }
  function load_song(song_hash){
    retrun ns.get('saved')[song_hash]
  }
  function pickle_brain(brain){
    //turn NN into JSON

    //hash on JSON to get brain_hash

    //store in dodo.brains[brain_hash] = JSON_representation_of_NN

    return brain_hash
  }
  function save_song(song){
    //turn song into storable sample = {input:, output:}

    //get a hash of the sample

    //store in dodo.saved[song_hash] = song

    return song_hash
  }

  $('.asong').on('click', AB)
  // evolving_action()
  $('#A').click()
  $('#evolve').on('click', evolving_action)
  $('#save').on('click', {from: $('.asong'), to: $('.songs')}, saving_action)
  $('#learn').on('click', {from: $('.songs'), to: $('.brains')}, learning_action)

})











