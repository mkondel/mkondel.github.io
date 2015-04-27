$( document ).ready(function() {

//======================================================
var new_set1 = [{"input":["<2QNrM.|b?,Z|brM2Z.NQ?<,"],"output":[1,0]},{"input":["-\\>clg:zc\\`+z>\\-l`+gcc:\\"],"output":[0,1]},{"input":["kHtF:8o_2`eDeH2D_oF`8t:k"],"output":[1,0]},{"input":["H0?pb2v}ZSU_pS_}?b2HvUZ0"],"output":[0,1]},{"input":["AHN?d]B~/Np*?N/pAH*BN]d~"],"output":[1,0]},{"input":["[pK)Z{2w.IVl{V.K2l[)wpIZ"],"output":[0,1]},{"input":["id)O_Jd,AL?))dOL_?),dJAi"],"output":[0,1]}]

var sample_sets = {
  '12': [{"input":[">>=?>?","CCCCCC"],"output":[1,0]}
    ,{"input":["SXWXXS","PRQSWM"],"output":[1,0]}
    ,{"input":["989988","323354"],"output":[1,0]}
    ,{"input":["QQNJQL","XXWSXS"],"output":[1,0]}
    ,{"input":[",,.-,.","222222"],"output":[1,0]}
    ,{"input":["CFDCCC","<?@:><"],"output":[1,0]}
    ,{"input":["@CCFFD","IIJJHI"],"output":[1,0]}
    ,{"input":["~*(+~~",",.-.,,"],"output":[1,0]}
    ,{"input":["9898:9",">>?>>>"],"output":[1,0]}
    ,{"input":["998889","432423"],"output":[1,0]}
    ,{"input":["ILQQJJ","@IIF@D"],"output":[1,0]}
    ,{"input":["998988","532332"],"output":[1,0]}
    ,{"input":["422223","988888"],"output":[1,0]}
    ,{"input":["889989","224333"],"output":[1,0]}]
, '24': [{"input":["vtsspottqroq","qjhjgcjnkldg"],"output":[1,0]}
    ,{"input":["[X[XV[\\\\XRTWW","RRVVNOPPGLKO"],"output":[1,0]}
    ,{"input":["totttqttrqtt","hgskiiiimesl"],"output":[1,0]}
    ,{"input":["{z|z|{}{|||{","qnuo{otpsppv"],"output":[1,0]}
    ,{"input":["qovrqstrtott","gcjniimjqili"],"output":[1,0]}
    ,{"input":["ULZJLNPLLLLU","[W\\\\RXX[WXXXX"],"output":[1,0]}
    ,{"input":["mlhkihhllmjk","tttttttttttt"],"output":[1,0]}
    ,{"input":["qttvrttttqor","ijsjljihhgci"],"output":[1,0]}
    ,{"input":["B@A@@@JAIDCG","LLLLLLLLLLNL"],"output":[1,0]}
    ,{"input":["LLNLLJLLLNLL","CFKE@EABAEDB"],"output":[1,0]}
    ,{"input":["mljlkikhmhhl","ejbc_e`^aa`c"],"output":[1,0]}
    ,{"input":["tpoqstqsotrv","||z{|||{z|{|"],"output":[1,0]}
    ,{"input":["WX\\\\[VTZR^WX[","cdbgb_d]abb\\\\"],"output":[1,0]}
    ,{"input":["\\\\_ckddb]dgbb","hjllkklhmmll"],"output":[1,0]}]
}//-----------------------------------------------------------------------------------------

// variable initilization
//=======================
var Nin = 24
,   H = 2
,   O = 2
,   network = new synaptic.Architect.Perceptron(Nin, Nin*H, O)
,   trainer = new synaptic.Trainer(network)
,   sample_set = sample_sets[Nin]
//-----------------------------------------------------------------------------------------

// enforce input vector dimensionality
//===========================================
var filter_by_len = function(l, sample_set){
  var new_set_x = []
  sample_set.forEach(function(point){ if(point.input.length==l) new_set_x.push(point) })
  return new_set_x
}//-----------------------------------------------------------------------------------------

//=========================================================================================
// map (note -> [0,1])
// console.log(foo.length, JSON.stringify(foo.map(function(x){return (x).toPrecision(2)})))
var transform = function(phrase){
  return phrase.split('').map(function(note){return 30*synaptic.Neuron.squash.TANH(1/note.charCodeAt())}).slice(0,24)
}//-----------------------------------------------------------------------------------------

// transform list of hyper points
//=========================================
var make_sample_to_training = function(s){
  return s.map(function(x){ return {input:transform(x.input.join('')), output:x.output} })
}//-----------------------------------------------------------------------------------------

// run after training
// check neural network outputs against a sample of hyperpoints
//===============================================================
var test_all = function(training_set_of_all, sample_set_of_all){
  training_set_of_all.forEach(function(some_case, idx, arr){
    var test_output =
        '\t[' +
          network.activate(
            transform(
                sample_set_of_all[idx].input.join('')
              ))
            .map(function(x){
              return Math.floor(x.toPrecision(2))
            })
        + ']'

//this is where prediction will happen
    console.log(
      sample_set_of_all[idx].input.join('\t')
      + '\t'
      + '[' + sample_set_of_all[idx].output + ']'
      + test_output
    )
  })
}//-----------------------------------------------------------------------------------------

// progress callback
//=======================================
var custom_logger = function(stat_now) {
  // console.log(JSON.stringify(stat_now, null, 0))
  if(stat_now.error < 0.012){
    test_all(training_set, sample_set)
  }
}//-----------------------------------------------------------------------------------------



//=====================================================
var training_set = make_sample_to_training(sample_set)

console.log('Final:' + JSON.stringify(trainer.train( training_set, {
    rate: .02,
    iterations: 100000,
    error: 0.0091,
    customLog: { every: 1000, do: custom_logger }
})))


var set_b = new_set1
test_all(make_sample_to_training(set_b), set_b)
//-----------------------------------------------------------------------------------------






})
//-----------------------------------------------------------------------------------------
