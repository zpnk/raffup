var app = app || {}

app.meetup = (function($) {

  var BASE_URL = "https://api.meetup.com/2"

  var getCurrentUser = function() {
    $.get(BASE_URL + "/member/self/", {
      access_token: app.main.user.token
    }).done(function(data) {
      // window.location.hash = ''
      app.events.publish('meetup:got:currentUser', data)
    })
  }

  var getRecentMeetups = function() {
    $.get(BASE_URL + "/events", {
      access_token: app.main.user.token,
      member_id:    app.main.user.id,
      status:       "past",
      rsvp:         "yes",
      desc:         true,
      page:         5
    }).done(function(data) {
      app.events.publish('meetup:got:recentMeetups', data)
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
    getCurrentUser:   getCurrentUser,
    getRecentMeetups: getRecentMeetups,
    getRSVPS:         getRSVPS
  }

})(jQuery)
