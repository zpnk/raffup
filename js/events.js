var app = app || {}

app.events = (function($) {

  var publish = function(name, data) {
    $(document).trigger(name, [data])
  }

  var subscribe = function(name, callback) {
    $(document).on(name, function(event, data) {
      callback(data)
    })
  }

  return {
    publish:   publish,
    subscribe: subscribe
  }

})(jQuery)
