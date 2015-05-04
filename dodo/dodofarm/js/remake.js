//---------------------------------------------------------------
// console.log(c.toDataURL('image/png'))
//---------------------------------------------------------------
console.log('whatthe fuck 2')

$( document ).ready(function() {

  console.log('whatthe fuck 3')
  var storage_namespace = 'dodo'
  ,   ns=$.initNamespaceStorage(storage_namespace)

  if( ns.localStorage.isEmpty() ){
    ns.localStorage.set('saved',{})
    ns.localStorage.set('brains',{})
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
    return NN
  }
  function pickle_brain(brain){
    return brain_hash
  }
  function save_song(song){
    return song_hash
  }
  function load_song(song_hash){
    return song
  }

  $('.asong').on('click', AB)
  // evolving_action()
  $('#A').click()
  $('#evolve').on('click', evolving_action)
  $('#save').on('click', {from: $('.asong'), to: $('.songs')}, saving_action)
  $('#learn').on('click', {from: $('.songs'), to: $('.brains')}, learning_action)

})











