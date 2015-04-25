if (typeof PLAY === 'undefined') PLAY = {
    picked_instrument: "acoustic_grand_piano"
,   picked_soundfont: "./soundfont/"

, play_ascii: function (data) { 
    PLAY.play_song(data)
  }
, play_midi: function (data) { 
    PLAY.play_song(data.best)
  }

, play_song: function(song) {
    var play_me = function(){
      printme('play_song')
      var velo = 127, dura = .5, dela = 200
      // MIDI.programChange(0, MIDI.GM.byName[picked_instrument].number)

      var play_this = function(unplayed_notes){
        var note = PLAY.ascii_midi(unplayed_notes.shift())
        MIDI.noteOn(0, note, velo, 0)
        MIDI.noteOff(0, note, dura)
        setTimeout(function(){
          unplayed_notes.length==0?printme('song_over'):play_this(unplayed_notes)
        }, dela)
      }
      play_this(song.slice())
    }
    MIDI.loadPlugin({
      soundfontUrl: PLAY.picked_soundfont,
      instrument: PLAY.picked_instrument,
      onsuccess: play_me
    })
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