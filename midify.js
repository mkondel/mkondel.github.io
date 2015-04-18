if (typeof Midify === 'undefined') Midify = {};
(function(root) { 'use strict';
  var DODOKEY = [ 'C',
                'C#',
                'D',
                'D#',
                'E',
                'F',
                'F#',
                'G',
                'G#',
                'A',
                'A#',
                'B']

  // return random integer with 0 ≤ j ≤ n
  var j = function(n){return Math.floor(Math.random() * (n+1));}

  // To shuffle an array a of n elements (indices 0..n-1):
  var n_completely_random = function(alphabet, n){
    a = []
    for(var i=n; i>0; i--){
      a.push(alphabet[j(alphabet.length-1)])
    }
    return a
  }

  // Sattolo's To shuffle an array a of n elements (indices 0..n-1):
  var unique_set_one_of_each = function(a){
    n = a.length
    //for i from n − 1 downto 1 do
    for(var i=n-1; i>1; i--){
      //j ← random integer with 0 ≤ j ≤ i
      J = j(i)
      //exchange a[j] and a[i]
      temp = a[i]
      a[i] = a[J]
      a[J] = temp
    }
    return a
  }

  // generate random 12 tones
  root.dodo = function(octave){
    var doderand = function(){return n_completely_random(DODOKEY, 12)}
    // doderand = function(){return unique_set_one_of_each(DODOKEY)}
    // doderand = function(){return DODOKEY}

    var file = new File();
    var track = new Track();

    file.addTrack(track);

    var dodelist = doderand()
    root.dodolist = dodelist.join()
    root.dodohtml = dodelist.join('&nbsp;_&nbsp;')
    
    for(var i=0; i<dodelist.length; i++){
      track.addNote(0, dodelist[i]+octave, 256, 1);
    }
    return file
  }

})(Midify)








