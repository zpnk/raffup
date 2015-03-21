var app = app || {};

app.utils = {

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
