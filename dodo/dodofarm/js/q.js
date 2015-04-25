$( document ).ready(function() {

$.printme = function(m){typeof console!='undefined'?console.log(m):null}

var genetic = Genetic.create()
,   plot_data = {from_genetic:[], from_statistics:{v:[], d:[], s:[], k:[], m:[]}}
,   statistics = new RunningStats

var choice = ['A','B']
,   j = function(n){return Math.floor(Math.random() * (n+1))}
,   get_ascii = function(x){ return PLAY.note_phrase_ascii($('#'+x).html().split(',')).join('') }
,   chose = function(c){
      var dics = {A:['A','B'], B:['B','A']}
      PLAY.play_ascii( get_ascii(c).split('') )
      return dics[c]
    }
,   save = function(c){
      var   da = get_ascii(c[0])
      ,   nyet = get_ascii(c[1])
      ,   hash = CryptoJS.SHA3(da+nyet, { outputLength: 64 })

      localStorage.setItem(hash, JSON.stringify( { yes:da, no:nyet } ))
    }
,   evolve = function(c){
      var   da = get_ascii(c[0])
      ,   nyet = get_ascii(c[1])
      // ,   hash = CryptoJS.SHA3(da+nyet, { outputLength: 64 })

      dodos( {yes:da, no:nyet} )
    }
,   n_completely_random = function(alphabet, n){
      var a = []
      for(var i=n; i>0; i--){
        a.push(alphabet[j(alphabet.length-1)])
      }
      return a.join('')
    }
,   unique_set_one_of_each = function(a){
      var b = a.slice()
      var n = b.length
      //for i from n − 1 downto 1 do
      for(var i=n-1; i>1; i--){
        //j ← random integer with 0 ≤ j ≤ i
        var J = j(i)
        //exchange b[J] and b[i]
        var temp = b[i]
        b[i] = b[J]
        b[J] = temp
      }
      return b
    }
,   dodos = function(ancestors){
      console.log(JSON.stringify(ancestors))

      $.when(
        DODO.populate(
          genetic, 
          {
            genepool: PLAY.midi_genepool(21,109),
            select1: Genetic.Select1.Random, 
            select2: Genetic.Select2.FittestRandom, 
            optimize: Genetic.Optimize.Maximize,
            start_seed: ancestors,
            progress_callback: prog_cb,
            result_callback: end_cb
          }))
      .done(function(data){
        $('.progressbar').fadeIn()
        data.evolve({
          'iterations': Math.pow(2,12),
          'size': Math.pow(2,10),
          // 'crossover': Math.pow(2,-12),
          // 'mutation': Math.pow(2,-12),
          'crossover': .3,
          'mutation': .5
          // 'skip': Math.pow(2,4)
        })
      })
    }
,   end_cb = function(gen){
      $('#A').html(PLAY.ascii_phrase_notes( gen['best'].split('') ).join(','))
      $('#B').html(PLAY.ascii_phrase_notes( gen['worst'].split('') ).join(','))
    }
,   prog_cb = function(done){
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

$('.seeder').focus()
  .bind('keypress', function(e) {
    if(e.keyCode==13){ //ENTER
      $('.asong').fadeIn()
      $('.controls').fadeIn()

      var user_notes = $('.seeder').val().split('')
      $('#A').html(PLAY.ascii_phrase_notes( user_notes ).join(','))
      $('#B').html(PLAY.ascii_phrase_notes( unique_set_one_of_each(user_notes) ).join(','))
    }
  })

$('#A').attr('title','Song A')
  .on('click',function(){ choice = chose('A') })
$('#B').attr('title','Song B')
  .on('click',function(){ choice = chose('B') })
$('#save')
  .attr('title','Save choice')
  .on('click',function(){ save(choice) })
$('#evolve')
  .attr('title','Evolve chosen')
  .on('click',function(){ evolve(choice) })


//this makes the first random seed for user inside the input box
$.when(
  $(".loader").fadeOut())
.done(function(){
  $('.seeder').val(n_completely_random(PLAY.midi_genepool(21,109),12))
})


})





