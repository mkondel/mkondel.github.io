$( document ).ready(function() {


var storage_namespace = 'dodo'
var ns=$.initNamespaceStorage(storage_namespace);
if( ns.localStorage.isEmpty() ){
  ns.localStorage.set('training_set',{})
}

  $(Object.keys(ns.localStorage.get('training_set')))
    .each(function(){ $('.controls').add_canvas( this ) })

  $('#feed').on('click',function(){
    $('.controls').add_canvas( '' )
  })

// console.log(c.toDataURL('image/png'))

})