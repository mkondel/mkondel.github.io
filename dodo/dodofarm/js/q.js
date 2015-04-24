$( document ).ready(function() {
self.printme = function(m){typeof console!='undefined'?console.log(m):null}

var show = function(o){alert(o)}
    get_ascii = function(x){ return PLAY.note_phrase_ascii($('#'+x).html().split(',')).join('') }
,   choice = ['A','B']
,   store_notes = function(c){
      // show(JSON.stringify( { yes:get_ascii(c[0]), no:get_ascii(c[1]) } ))
      var   da = get_ascii(c[0])
      ,   nyet = get_ascii(c[1])
      ,   hash = CryptoJS.SHA3(da+nyet, { outputLength: 64 })

      localStorage.setItem(hash, JSON.stringify( { yes:da, no:nyet } ))
    }

$('div').addClass('w')

DOER.do_dodos(function(data){
  var A=data.best, B=data.worst

  $('#A')
    .attr('title','Song A')
    .html(PLAY.ascii_phrase_notes(A).join(','))
    .on('click',function(){ PLAY.play_ascii(data.best); choice=['A','B']; /*store_notes(choice)*/ })

  $('#B')
    .attr('title','Song B')
    .html(PLAY.ascii_phrase_notes(B).join(','))
    .on('click',function(){ PLAY.play_ascii(data.worst); choice=['B','A']; /*store_notes(choice)*/ })

  $('#S')
    .attr('title','Submit choice')
    .html('Submit')
    .on('click',function(){ store_notes(choice) })
    .css('background-color','yellow')

})



})





