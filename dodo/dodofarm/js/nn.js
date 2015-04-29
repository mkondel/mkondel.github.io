if (typeof NN === 'undefined') NN = {

  new_set1: [{"input":["<2QNrM.|b?,Z|brM2Z.NQ?<,"],"output":[1,0]},{"input":["-\\>clg:zc\\`+z>\\-l`+gcc:\\"],"output":[0,1]},{"input":["kHtF:8o_2`eDeH2D_oF`8t:k"],"output":[1,0]},{"input":["H0?pb2v}ZSU_pS_}?b2HvUZ0"],"output":[0,1]},{"input":["AHN?d]B~/Np*?N/pAH*BN]d~"],"output":[1,0]},{"input":["[pK)Z{2w.IVl{V.K2l[)wpIZ"],"output":[0,1]},{"input":["id)O_Jd,AL?))dOL_?),dJAi"],"output":[0,1]}]
, sample_sets: {
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
}
// variable initilization
//=======================
,   Nin: 24
,   H: 2
,   O: 2
,   network: null
,   storage_namespace: 'dodo'

// enforce input vector dimensionality
//===========================================
, filter_by_len: function(l, sample_set){
    var new_set_x = []
    sample_set.forEach(function(point){ if(point.input.length==l) new_set_x.push(point) })
    return new_set_x
  }

//=====================
// map (note -> [0,1])
// console.log(foo.length, JSON.stringify(foo.map(function(x){return (x).toPrecision(2)})))
, transform: function(phrase){
    return phrase
      .input
        .join('').split('')
          .map(function(note){
            return 30*synaptic.Neuron.squash.IDENTITY(1/note.charCodeAt())
          })
            .slice(0,this.Nin)
  }

// run after training
// check neural network outputs against a sample of hyperpoints
//===============================================================
, test_all: function(sample_set_of_all){
    var foo = this
    sample_set_of_all.forEach(function(some_case, idx, arr){
      var test_output = foo.network.activate( foo.transform( sample_set_of_all[idx] ) )
      //this is where prediction will happen
      console.log(
        sample_set_of_all[idx].input.join('\t') +'\t['+ 
        sample_set_of_all[idx].output +']\t'+ 
        // (function(){ return test_output[0]>test_output[1]?'|-->>':'<<--|' })()
        test_output
      )
    })
  }

//=====================================================
, init_and_run: function(new_training_sample){
    var training_set = new_training_sample.map(function(x){ return {input:NN.transform(x), output:x.output} })
    //=======================================
    // progress callback
    var custom_logger = function(stat_now) {
        // if(stat_now.error > 1.1){
          console.log(stat_now)
          // this.test_all(new_training_sample)
        // }
      }

    var ns=$.initNamespaceStorage(this.storage_namespace);
    if( ns.localStorage.isEmpty() || !ns.localStorage.isSet('brains') ){
      ns.localStorage.set('brains',{})
    }else{
      // alert('brains:\n'+JSON.stringify(ns.localStorage.get('brains')))
    }

    // DEBUG for checking that training set is good
    // alert(
    //   training_set.map(function(t){
    //     return '('+ t.input.map(function(x){
    //             return (x).toPrecision(1)
    //           }).join('|') + ') -> ['
    //         + t.output + ']\n'
    //   }).join('\n')
    // )

    this.network = new synaptic.Architect.Perceptron(this.Nin, this.Nin*this.H, this.O)
    var trainer = new synaptic.Trainer(this.network)
    var foo = this

    var bla = this.sample_sets['24'].map(function(x){ return {input:NN.transform(x), output:x.output} })
    // for(var i=0; i<bla.length; i++){
    //   console.log(JSON.stringify(bla[i]))
    //   console.log(JSON.stringify(training_set[i]))
    // }
    // console.log('Final:' + JSON.stringify(trainer.train( training_set, {
    console.log('Final:' + JSON.stringify(trainer.train( bla, {
        rate: 1e-7,
        iterations: 100,
        error: .1,
        customLog: { every: 1e3, do: custom_logger.bind(foo) },
        cost: trainer.cost.MSE
    })))

    this.test_all(this.sample_sets['24'])
    // this.test_all(new_training_sample)
    ns.localStorage.set('brains',this.network.toJSON())
  }
}









