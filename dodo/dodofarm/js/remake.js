$( document ).ready(function() {

  var storage_namespace = 'dodo'
  var ns=$.initNamespaceStorage(storage_namespace);
  if( ns.localStorage.isEmpty() ){
    ns.localStorage.set('training_set',{})
  }

  // $(Object.keys(ns.localStorage.get('training_set')))
  //   .each(function(){ $('.controls').add_canvas( this ) })

  // $('.butt').button()

  $('#feed').on('click',function(){
    $('.brains').add_canvas( '' )
  })

  $('#learn').on('click',function(){
    $('.brains').add_canvas( '' )
  })

// console.log(c.toDataURL('image/png'))

})