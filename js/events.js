var app = app || {}

app.events = (function($) {

  var publish = function(name, data) {
    $(document).trigger(name, [data])
  }

  var subscribe = function(name, callbacks) {
    $(document).on(name, function(event, data) {
      if (Array.isArray(callbacks)) {
        callbacks.forEach(function(callback) {
          callback(data)
        })
      } else {
        callbacks(data)
      }
    })
  }

  return {
    publish:   publish,
    subscribe: subscribe
  }

})(jQuery)
