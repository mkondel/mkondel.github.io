var counter = 0
,   runit   = true
,   curr_brain = {fake_brain:'_pretend_json_'}

onmessage = function(e) {
  var data = e.data
  switch (data.cmd) {
    case 'evolve':
      postMessage({cmd: 'evolutioning', payload: evolving_action( data.payload )})
      break
    case 'learn':
      data.payload.curr_brain = curr_brain
      postMessage({cmd: 'learned', payload: data.payload})
      break
}
}

function evolving_action(last_song){
  if( typeof last_song != 'undefined' ){
    return last_song.input
  }else{
    return ['WebWorker.new_pleasant_song(1)', 'WebWorker.new_pleasant_song(2)']
  }
}

//LEARN:   re-train curr_brain, start using the new_curr_brain
// training of brains has iteration, error, learning factor limits
//
// training always over whole SAVED set
// if curr_brain == null, init ortho-random NN, train with the 1 SAVED input so far
// if curr_brain exists, use it as the 'init', and still train over all of SAVED

//EVOLVE:  _evolve_(A,B), using curr_brain to rate individuals during selection
// _evolve_(A,B) has population, generation, error limits
//
// _evolve_(A,B) notes according to some rules
// these rules can be evolved next...
// this might be a way to find 'good sounding fractals' for song generation







