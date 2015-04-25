//all the misc functinos that make this page work
if (typeof DOER === 'undefined') DOER = {
  random_animal: function(T){
    var wrapper = function(c){ return '&#'+c+';' }
    ,   j = function(n){return Math.floor(Math.random() * (n+1))}
    ,   start_char = 128000
    ,   delta = 61

    if(!DOER.stop_this){
      setTimeout( function(){
        $('#new_dodo').html( wrapper(start_char+j(delta)) )
        DOER.random_animal(T)
      }, T )
    }
  }

}