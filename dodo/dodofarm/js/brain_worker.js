var counter = 0
,   runit   = true


onmessage = function(e) {
  var data = e.data
  switch (data.cmd) {
    case 'compare_and_find_better':
      postMessage({cmd: 'foobar', payload: data.payload})
      break
    case 'learn':
      postMessage({cmd: 'learned', payload: data.payload})
      break
}}






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