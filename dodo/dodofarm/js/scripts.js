jQuery.cachedScript = function( url, options ) {
  options = $.extend( options || {}, {
    dataType: "script",
    cache: true,
    url: url
  })
  return jQuery.ajax( options )
}

$.when(

    <!-- ///////////////////////////////////////////////////////////////////////////////////// -->
    // $.cachedScript( 'http://code.jquery.com/ui/1.11.4/jquery-ui.min.js' ),
    $.cachedScript( 'http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/sha3.js' ),

    <!-- ///////////////////////////////////////////////////////////////////////////////////// -->
    $.cachedScript( 'js/libs/jq/jquery.storageapi.min.js' ),
    $.cachedScript( 'js/libs/shims/Base64.js' ),
    $.cachedScript( 'js/libs/shims/Base64binary.js' ),
    $.cachedScript( 'js/libs/MIDI.js' ),
    $.cachedScript( 'js/libs/genetic.js' ),
    $.cachedScript( 'js/libs/synaptic.js' ),
    $.cachedScript( 'js/running_stats.js' ),
    $.cachedScript( 'js/play.js' ),

    <!-- ///////////////////////////////////////////////////////////////////////////////////// -->
    $.cachedScript( 'js/hash_icons.js' ),

    <!-- ///////////////////////////////////////////////////////////////////////////////////// -->
    $.Deferred(function( deferred ){
        $( deferred.resolve )
    })
).done(function(){


    $.cachedScript( 'js/remake.js' )


})
