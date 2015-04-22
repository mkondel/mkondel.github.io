$( document ).ready(function() {

  $('#seed, #replay, #new_dodo').addClass('b')
  $('#dodos, #seed_string').addClass('notes')
  $('#logs, #dodos, #seed_string, #seed, #replay, #new_dodo').addClass('inner_div')

  $('#new_dodo').on('click',function(){DOER.do_dodos()})

})