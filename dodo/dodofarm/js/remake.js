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
  })

  $('#feed').on('click',function(){
    $('.brains').add_canvas( Math.random().toString() )
  })

  $('#learn').on('click',function(){
    for(var i=0; i<32; i++){
      $('.brains').add_canvas( Math.random().toString() )
    }
  })

// console.log(c.toDataURL('image/png'))

})