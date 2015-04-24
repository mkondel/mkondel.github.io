$( document ).ready(function() {
self.printme = function(m){typeof console!='undefined'?console.log(m):null}

var show = function(o){alert(o)}
,   choice = ''
,   store_notes = function(c){
      show(JSON.stringify({ foo: PLAY.note_phrase_ascii($('#'+c).html().split(',')).join('') }))
    }
,   submit_my = function(c){
      if(c=='A'){
        store_notes('A')
      }else if(c=='B'){
        store_notes('B')
      }else{
        alert(c+'_')
      }
    }

$('div').addClass('b')

DOER.do_dodos(function(data){
  $('#A')
    .attr('title','Song A')
    .html(PLAY.ascii_phrase_notes(data.best).join(','))
    .on('click',function(){ PLAY.play_ascii(data.best); choice='A' })

  $('#B')
    .attr('title','Song B')
    .html(PLAY.ascii_phrase_notes(data.worst).join(','))
    .on('click',function(){ PLAY.play_ascii(data.worst); choice='B' })

  $('#S')
    .attr('title','Submit choice')
    .html('Submit')
    .on('click',function(){ submit_my(choice) })
    .css('background-color','yellow')

})



})





