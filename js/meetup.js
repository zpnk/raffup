var app = app || {}

app.meetup = (function($) {

  var BASE_URL = 'https://api.meetup.com/2'

  var getUser = function() {
    $.get(BASE_URL + '/member/self/', {
      access_token: app.main.user.token
    }).done(function(data) {
      app.events.publish('meetup:got:user', data)
    })
  }

  var getMeetup = function() {
    $.get(BASE_URL + '/events', {
      access_token:  app.main.user.token,
      group_urlname: 'VegasJS',
      status:        'past',
      rsvp:          'yes',
      desc:          true,
      page:          1
    }).done(function(data) {
      app.events.publish('meetup:got:meetup', data.results[0])
    })
  }

  var getRSVPS = function(id) {
    $.get(BASE_URL + "/rsvps", {
      access_token: app.main.user.token,
      event_id:     id,
      rsvp:         "yes"
    }).done(function(data) {
      app.events.publish('meetup:got:rsvps', data)
    })
  }

  return {
    getUser:   getUser,
    getMeetup: getMeetup,
    getRSVPS:  getRSVPS
  }

})(jQuery)
