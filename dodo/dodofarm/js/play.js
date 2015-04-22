if (typeof PLAY === 'undefined') PLAY = {
    picked_instrument: "acoustic_grand_piano"
,   picked_soundfont: "./soundfont/"
,   song: null

, play_ascii: function (data) { 
    PLAY.song = data
    var actual_notes = PLAY.ascii_phrase_notes(data)
    DOER.print_me(actual_notes, 'dodos')
    MIDI.loadPlugin({
      soundfontUrl: PLAY.picked_soundfont,
      instrument: PLAY.picked_instrument,
      onsuccess: PLAY.play_song
    })
  }

, play_midi: function (data) { 
    DOER.print_me(data.best.join('')+' >> '+data.worst.join(''))
    PLAY.song = data.best
    var actual_notes = PLAY.ascii_phrase_notes(data.best)
    DOER.print_me(actual_notes, 'dodos')
    DOER.ascii_print(PLAY.song.join(''), 'seed_string')
    MIDI.loadPlugin({
      soundfontUrl: PLAY.picked_soundfont,
      instrument: PLAY.picked_instrument,
      onsuccess: PLAY.play_song
    })
  }

, play_song: function() {
    DOER.print_me('play_song', 'logs')
    DOER.stop_this = true
    var velo = 127, dura = .5, dela = 200
    // MIDI.programChange(0, MIDI.GM.byName[picked_instrument].number)

    var play_this = function(unplayed_notes){
      var note = PLAY.ascii_midi(unplayed_notes.shift())
      MIDI.noteOn(0, note, velo, 0)
      MIDI.noteOff(0, note, dura)
      setTimeout(function(){
        unplayed_notes.length==0?DOER.song_over(DOER.print_me):play_this(unplayed_notes)
      }, dela)
    }

    var tape = PLAY.song.slice()
    PLAY.curr_notes = PLAY.ascii_phrase_notes(tape)
    PLAY.curr_keys = PLAY.ascii_phrase_midi(tape)
    play_this(tape)
  }

, midi_genepool: function(s,e){
    var list = []
    for(var i=s; i<e; i++){
      list.push(PLAY.midi_ascii(i))
    }
   return list
  }

, midi_ascii: function (m){ return String.fromCharCode(m+18) }
, ascii_midi: function (a){ return a.charCodeAt(0)-18 }
, ascii_phrase_midi:  function (p){ return p.map( PLAY.ascii_midi ) }
, ascii_phrase_notes: function (p){ return p.map(function(a){ return MIDI.noteToKey[a.charCodeAt(0)-18] }) }
, note_phrase_ascii:  function (p){ return p.map(function(a){ return PLAY.midi_ascii(MIDI.keyToNote[a]) }) }

}