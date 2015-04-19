if (typeof PLAY === 'undefined') PLAY = {};
(function(root) { 'use strict';
  var picked_instrument = "acoustic_grand_piano"
  var picked_soundfont = "./soundfont/dodo/"
  var OCTAVE = 3
  var song = null

  root.play_midi = function (data) { 
    // print_me(data.best.join(',')+' >> '+data.worst.join(','))
    print_me('start dodo song')
    song = data.best.slice()
    MIDI.loadPlugin({
      soundfontUrl: picked_soundfont,
      instrument: picked_instrument,
      onsuccess: play_it
    })
  }

  var play_it = function() {
    var velo = 127, dura = .5, dela = 200
    // MIDI.programChange(0, MIDI.GM.byName[picked_instrument].number)

    var play_this = function(unplayed_notes){
      var note = MIDI.keyToNote[unplayed_notes.shift()+OCTAVE]
      MIDI.noteOn(0, note, velo, 0)
      MIDI.noteOff(0, note, dura)
      setTimeout(function(){
        unplayed_notes.length==0?print_me('last note played'):play_this(unplayed_notes)
      }, dela)
    }
    var tape = song.slice()
    play_this(tape)
  }
})(PLAY)




