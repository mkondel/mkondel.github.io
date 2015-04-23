//documents have words in them
$( document ).ready(function() {

//styles
$('#seed, #replay, #new_dodo').addClass('b')
$('#dodos, #seed_string, #logs').addClass('notes')
$('#logs, #dodos, #seed_string, #seed, #replay, #new_dodo').addClass('inner_div')

//initial states and events
$('#seed_string')
  .attr('title','seed').attr('value','hello')
$('#replay')
  .attr('title','replay').html('play')
  .on('click',function(){ PLAY.play_song() })
$('#new_dodo')
  .attr('title','evolve').html('&#127926;')
  .on('click',function(){ DOER.do_dodos() })
$('#seed')
  .attr('title','seed').html('seed')
  .on('click',function(){ PLAY.play_ascii($('#seed_string').val().split('')) })


//this must be the best icon...
$('#favicon').attr('href',href='data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4fwAA+b8AAA+gAAD8PwAA+18AABNoAAD07wAA9h8AABjwAAD8/wAA/n8AAAUgAAD9vwAA/T8AAARgAAD+/wAA')

})