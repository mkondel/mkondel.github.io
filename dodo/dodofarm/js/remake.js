$( document ).ready(function() {

  var saving_action = function( opts ){
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

  var learning_action = function( opts ){
    opts.data.to.add_canvas( Math.random().toString() )
    var new_canvas = $('#canvas'+($('canvas').length-1))
    new_canvas.hide().appendTo(opts.data.to).fadeIn()
    opts.data.from.effect("transfer",{ to: new_canvas }, 300)
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
  $('#learn').on('click', {from: $('.asong'), to: $('.brains')}, learning_action)


// console.log(c.toDataURL('image/png'))

})