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
      status:        'upcoming,past',
      rsvp:          'yes',
      desc:          true,
      page:          1
    }).done(function(data) {
      app.events.publish('meetup:got:meetup', data.results[0])
    })
  }

  var getAttendees = function(event) {
    $.get(BASE_URL + '/rsvps', {
      access_token: app.main.user.token,
      event_id:     event.id,
      rsvp:         'yes'
    }).done(function(data) {
      app.events.publish('meetup:got:attendees', data)
    })
  }

  return {
    getUser:      getUser,
    getMeetup:    getMeetup,
    getAttendees: getAttendees
  }

})(jQuery)
