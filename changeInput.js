/**
 * ChangeInput event
 * 
 * jquery input event does not include key pressed. This custom event extends input event, 
 * triggered only if an input-event happens that changes the value, and includes:
 *  - event.key
 *  - event.keyCode
 *  - event.which
 *
 * https://github.com/Carlos-pineiro/changeInput
 * 
 * Copyright 2018, Carlos Piñeiro
 *
 * Licensed under MIT
 *
 * Released on: Aug 31, 2018
 */

(function($){
  var $event = $.event,
  $special = $event.special.changeInput = {
    setup: function(){
      $(this).on('input',$special.handler);
    },
    teardown: function(){
      $(this).off('input',$spceial.handler);
    },
    handler: function(event) {
      var context = this,
      args = arguments,
      keyPressed = getKeyPressed($(context).val(), $(context).data('oldVal') || ""),
      dispatch = function() {
        event.type = 'changeInput';
        event.keyCode = keyPressed.charCodeAt(0);
        event.key = event.which = keyPressed;
        $event.dispatch.apply(context,args);
      };
      if($(context).val() != $(context).data('oldVal')){
        dispatch();
        $(context).data('oldVal',$(context).val());
      }
    }
  };
  
  function getKeyPressed(a, b) {
    var i = 0, 
        j = 0,
        result = "";

    if(b.length < a.length) {
      while (j < a.length) {
        if (b[i] != a[j] || i == b.length)
          result += a[j];
        else
          i++;
        j++;
      }
    } else {
      result = "\b";
    }
    return result;
  }
  
})(jQuery);
