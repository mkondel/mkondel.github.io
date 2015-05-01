(function ( $ ) {

  $.fn.add_canvas = function(m){
    var id = 'canvas'+$('canvas').length
    var width = height = 32
    ,   canvas_proto = '<canvas id="'+ id +'" width="'+width+'" height="'+height+'"/>'
    this.append( canvas_proto )
    $('#'+id).Hashicon({message:m})
    return this
  }

  $.fn.Hashicon = function(opts){

    if(!opts)
      opts = {}
    if(!opts.bits)
      opts.bits = 64
    if(!opts.message)
      opts.message = ''

    var string_to_bitmask = function(m){
      var bitmask = []
      m.toString().split('').map(function(h){
        var char_as_binary = [h.charCodeAt().toString(2)]
        ,   missing_zeros = 8 - char_as_binary[0].length 
        while(missing_zeros){
          char_as_binary.unshift( 0 )
          missing_zeros--
        }
        bitmask.push( char_as_binary.join('') )
      })
      return bitmask.join('')
    }

    //must be a square (4,16,64,256)
    var any_hash_to_icon = function(ascii_string, canvas){
      var ctx = canvas.getContext("2d");
      var a = Math.sqrt(ascii_string.length)
      ,   d = canvas.width/a
      for(var i=0; i<ascii_string.length; i++){
        ctx.fillStyle = ascii_string[i]==0?"#FFF":"#000";
        var x = (i % a) * d
        ,   y = Math.floor(i / a) * d
        ctx.fillRect(x, y, d+.7, d+.7)  //just ramdon mnyber to make it look good
      }
    }

    return this.each(function(){
      var string_of_bits = string_to_bitmask( CryptoJS.SHA3(opts.message.toString(), { outputLength: opts.bits }) )
      any_hash_to_icon( string_of_bits, this )
      // console.log(c.toDataURL('image/png'))
    })
  }

}( jQuery ));