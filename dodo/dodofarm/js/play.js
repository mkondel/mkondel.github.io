if (typeof PLAY === 'undefined') PLAY = {};
(function(PLAY) { 'use strict';
  var picked_instrument = "acoustic_grand_piano"
  var picked_soundfont = "./soundfont/"
  var OCTAVE = 7
  PLAY.song = null

  PLAY.play_midi = function (data) { 
    DOER.print_me(data.best.join(',')+' >> '+data.worst.join(','))
    PLAY.song = data.best.slice()
    DOER.stop_this = true
    DOER.print_me(PLAY.song, 'dodos')
    MIDI.loadPlugin({
      soundfontUrl: picked_soundfont,
      instrument: picked_instrument,
      onsuccess: PLAY.play_song
    })
  }

  PLAY.play_song = function() {
    DOER.print_me('play_song', 'logs')
    var velo = 127, dura = .5, dela = 200
    // MIDI.programChange(0, MIDI.GM.byName[picked_instrument].number)

    var play_this = function(unplayed_notes){
      var note = MIDI.keyToNote[unplayed_notes.shift()+OCTAVE]
      MIDI.noteOn(0, note, velo, 0)
      MIDI.noteOff(0, note, dura)
      setTimeout(function(){
        unplayed_notes.length==0?DOER.song_over(DOER.print_me):play_this(unplayed_notes)
      }, dela)
    }

    var tape = PLAY.song.slice()
    console.log('this here')
    self.curr_notes = []
    self.curr_keys = []
    for(var i=0; i<tape.length; i++){
      self.curr_notes.push(tape[i]+OCTAVE)
      self.curr_keys.push(MIDI.keyToNote[tape[i]+OCTAVE])
    }
    play_this(tape)
  }
})(PLAY)
