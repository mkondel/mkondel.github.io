$( document ).ready(function() {

//===========================
var Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect
//#--------------------------------------------------------------------------------------------------------

//==========================================
var P1 = new Architect.Perceptron(12,24,2);
//#--------------------------------------------------------------------------------------------------------


//=========================
var end_cb = function(gen){
  $('#A').html(PLAY.ascii_phrase_notes( gen['best'].split('') ).join(','))
  $('#B').html(PLAY.ascii_phrase_notes( gen['worst'].split('') ).join(','))
}
//#--------------------------------------------------------------------------------------------------------

//===========================
var prog_cb = function(done){

  statistics.Push(done.stats.stdev)

  plot_data['from_genetic'].push( [plot_data['from_genetic'].length, done.stats.stdev] )

  plot_data['from_statistics']['v'].push( [plot_data['from_statistics']['v'].length, statistics.Variance()] )
  plot_data['from_statistics']['d'].push( [plot_data['from_statistics']['d'].length, statistics.StandardDeviation()] )
  plot_data['from_statistics']['s'].push( [plot_data['from_statistics']['s'].length, statistics.Skewness()] )
  plot_data['from_statistics']['k'].push( [plot_data['from_statistics']['k'].length, statistics.Kurtosis()] )
  plot_data['from_statistics']['m'].push( [plot_data['from_statistics']['m'].length, statistics.Mean()] )

  var options = {
      lines: {show: true}
    // , points: {show: true}
    , xaxis: {tickDecimals: 0, tickSize: 1000}
    , yaxes: [{min: 0}, {position: 'right'}]
    , legend: { position: 'sw' }
  }
  $.plot(
    '.plot', [
        {data: plot_data['from_genetic'], label:'stdev_genetic', yaxis: 1}
      , {data: plot_data['from_statistics']['m'], label:'mean_runningstats', yaxis: 1}
      , {data: plot_data['from_statistics']['s'], label:'skewness_runningstats', yaxis: 2}
      , {data: plot_data['from_statistics']['k'], label:'kurtosis_runningstats', yaxis: 2}
      // , {data: plot_data['from_statistics']['d'], label:'stdev_runningstats', yaxis: 2}
      // , {data: plot_data['from_statistics']['v'], label:'variance_runningstats', yaxis: 2}
    ], options);

  $('.progressbar').progressbar({value: done.percent})
  if(done.percent==100){
    $('.progressbar').fadeOut()
  }
}
//#--------------------------------------------------------------------------------------------------------

//=======================
var foo = function(bla){
  return 'full perceptron:\n___________________\n'+JSON.stringify(bla.toJSON())
}
//#--------------------------------------------------------------------------------------------------------

//================================
var transform = function(phrase){
  return phrase.split('').map(function(note){return 30*Neuron.squash.TANH(1/note.charCodeAt())})
}
//---------------------------------------------------------------------------------------------------------

//====================================
// alert(Neuron.squash.TANH(1/150)*20)
// alert(foo(P1))
//#--------------------------------------------------------------------------------------------------------


})
//#--------------------------------------------------------------------------------------------------------





//#--------------------------------------------------------------------------------------------------------
//
//
//
