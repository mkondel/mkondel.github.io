$( document ).ready(function() {

self.printme = function(m){typeof console!='undefined'?console.log(m):null}

var choice = ['A','B']
,   j = function(n){return Math.floor(Math.random() * (n+1))}
,   unique_set_one_of_each = function(a){
        var b = a.slice()
        var n = b.length
        //for i from n − 1 downto 1 do
        for(var i=n-1; i>1; i--){
          //j ← random integer with 0 ≤ j ≤ i
          var J = j(i)
          //exchange b[J] and b[i]
          var temp = b[i]
          b[i] = b[J]
          b[J] = temp
        }
        return b
      }

,   chose = function(c){
      var dics = {A:['A','B'], B:['B','A']}
      PLAY.play_ascii( get_ascii(c).split('') )
      return dics[c]
    }
,   get_ascii = function(x){ return PLAY.note_phrase_ascii($('#'+x).html().split(',')).join('') }
,   store_notes = function(c){
      var   da = get_ascii(c[0])
      ,   nyet = get_ascii(c[1])
      ,   hash = CryptoJS.SHA3(da+nyet, { outputLength: 64 })

      localStorage.setItem(hash, JSON.stringify( { yes:da, no:nyet } ))
    }


$('.seeder').focus()
  .bind('keypress', function(e) {
    if(e.keyCode==13){
      var user_notes = $('.seeder').val().split('')
      $('#A').html(PLAY.ascii_phrase_notes( user_notes ).join(','))
      $('#B').html(PLAY.ascii_phrase_notes( unique_set_one_of_each(user_notes) ).join(','))
      $('.submit').fadeIn()
    }
  })

$('#A').attr('title','Song A')
  .on('click',function(){ choice = chose('A') })

$('#B').attr('title','Song B')
  .on('click',function(){ choice = chose('B') })

$('.submit').hide()
  .attr('title','Submit choice')
  .html('Submit')
  .on('click',function(){ store_notes(choice) })
  .css('background-color','yellow')



$(".loader").fadeOut()
})





