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
}}

function evolving_action(last_song){
  if( typeof last_song != 'undefined' ){
    return last_song.input
  }else{
    return ['WebWorker.new_pleasant_song(1)', 'WebWorker.new_pleasant_song(2)']
  }
}

  //TODO: WebWorker reloads training set from same dodo.saved
  //TODO:    any new saves automatically picked up and used in training NN


