var counter = 0
,   runit   = true
,   curr_brain = {fake_brain:'_pretend_json_'}

onmessage = function(e) {
  var data = e.data
  switch (data.cmd) {
    case 'evolve':
      postMessage({cmd: 'evolutioning', payload: evolving_action( data.payload )})
      // postMessage({cmd: 'evolutioning', payload: data.payload })
      break
    case 'learn':
      data.payload[ 'curr_brain' ] = curr_brain
      postMessage({cmd: 'learned', payload: data.payload})
      break
}}


function hash_it(m){
  return CryptoJS.SHA3( m, { outputLength: 64 } )
}

function evolving_action(last_song){
  if( typeof last_song != 'undefined' ){
    return last_song.input
  }else{
    return ['WebWorker.new_pleasant_song(1)', 'WebWorker.new_pleasant_song(2)']
  }
}



  //TODO: turn into perfect input for NN in WebWorker?
  //TODO: make WebWorker.NN_as_JSON()

  //TODO: WebWorker reloads training set from same dodo.saved
  //TODO:    any new saves automatically picked up and used in training NN






// function actual_evolution( good_song, bad_song ){
//   console.log('//TODO: here we talk to WebWorker (already running with NN that can rank good/bad songs)')

//   //suppose (A > B), try to evolve (A' > A), or at least (A > A') > B
//   var brain = {good:'good_from_brain',bad:'bad_from_brain'}

//   worker.postMessage({cmd:'compare_and_find_better', payload:[good_song, bad_song]}); // Send data to our worker.

//   worker.addEventListener('message', function(e) { brain = e.data }, false)

//   if( brain ){
//     console.log('actual_evolution: found a brain, evolving...')
//   }else{
//     console.log('actual_evolution: no brains, learn at least once to evolve')
//   }

//   return [ brain.good, brain.bad ]
// }