$( document ).ready(function() {

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
  }).click()

  var saving_action = function( opts ){
    opts.data.to.add_canvas( Math.random().toString() )
    var last_canvas = $('#canvas'+($('canvas').length-1))
    last_canvas.hide()
    last_canvas.fadeIn()
    opts.data.from.effect("transfer",{ to: last_canvas })
  }

  $('#save').on('click', 
    {from: $('.asong'), to: $('.songs')}, saving_action)


  $('#feed').on('click', 
    {from: $('.outlined'), to: $('.songs')}, saving_action)

  // $('#feed').on('click', function(){
  //   $('.songs').add_canvas( Math.random().toString() )
  //   var last_canvas = $('#canvas'+($('canvas').length-1))
  //   last_canvas.hide()
  //   last_canvas.fadeIn()
  //   // $('.outlined').effect("transfer",{ to: $(".songs") });
  //   $('.outlined').effect("transfer",{ to: last_canvas });
  // })


  $('#learn').on('click', function(){
    for(var i=0; i<32; i++){
      $('.brains').add_canvas( Math.random().toString() )
      var last_canvas = $('#canvas'+($('canvas').length-1))
      last_canvas.hide()
      last_canvas.fadeIn()
    }
    $(this).effect("transfer",{ to: $(".brains") });
  })

// console.log(c.toDataURL('image/png'))

})