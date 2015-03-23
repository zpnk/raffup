var app = app || {};

app.utils = {

  generateId: function() {
    var array = new Uint32Array(1)
    window.crypto.getRandomValues(array)
    return array[0]
  },

  params: function() {
    var query = window.location.hash.substring(1)
    var params = {}

    if (!query) return params

    query.split('&').forEach(function(param) {
      var arr = param.split('=')
      params[arr[0]] = decodeURIComponent(arr[1])
    })

    return params
  }

}
