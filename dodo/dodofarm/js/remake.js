$( document ).ready(function() {

  var saving_action = function( opts ){
    opts.data.to.add_canvas( Math.random().toString() )
    var last_canvas = $('#canvas'+($('canvas').length-1))
    last_canvas.hide()
    // opts.data.from.effect("transfer",{ to: last_canvas }, 200, function(){
    opts.data.from.effect("transfer",{ to: opts.data.to }, 200, function(){
      last_canvas.fadeIn()
    })
  }

  var storage_namespace = 'dodo'
  var ns=$.initNamespaceStorage(storage_namespace);
  if( ns.localStorage.isEmpty() ){
    ns.localStorage.set('training_set',{})
  }

  // $(Object.keys(ns.localStorage.get('training_set')))
  //   .each(function(){ $('.controls').add_canvas( this ) })

  // $('.butt').button()

  $('.asong').on('click',function(){
    if( !$('.asong').hasClass('outlined') ){
      $(this).toggleClass('outlined')
    }else{
      $('.asong').toggleClass('outlined')
    }
  })

  $('#A').click()
  $('#save').on('click', {from: $('.asong'), to: $('.songs')}, saving_action)
  $('#learn').on('click', {from: $('.asong'), to: $('.brains')}, saving_action)


// console.log(c.toDataURL('image/png'))

})