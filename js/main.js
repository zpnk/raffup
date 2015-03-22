var app = app || {}

app.main = (function($, _) {

  var $elements = {
    login:      $('.login'),
    meetups:    $('.meetups'),
    meetupsTpl: _.template($('.meetups-tpl').text()),
    rsvps:      $('.rsvps'),
    rsvpsTpl:   _.template($('.rsvps-tpl').text())
  }

  var attachEvents = function() {
    app.events.subscribe('meetup:got:currentUser', function(data) {
      user.init(data)
      app.meetup.getRecentMeetups()
    })

    app.events.subscribe('meetup:got:recentMeetups', render.meetups)

    app.events.subscribe('meetup:got:rsvps', render.rsvps)

    $(document).on('click', '.meetup', function(event) {
      event.preventDefault()
      app.meetup.getRSVPS($(this).data('meetup-id'))
    })
  }

  var user = {
    login: function() {
      var token = app.utils.params().access_token
      if (token) {
        user.token = token
        app.meetup.getCurrentUser()
      }
    },
    init: function(data) {
      user.name = data.name
      user.id   = data.id
      $elements.login.hide()
    }
  }

  var render = {
    meetups: function(data) {
      $elements.meetups.html($elements.meetupsTpl({meetups: data.results}))
    },
    rsvps: function(data) {
      $elements.rsvps.html($elements.rsvpsTpl({rsvps: data.results}))
    }
  }

  var init = function() {
    attachEvents();
    user.login();
  }

  return {
    init: init,
    user: user
  }

})(jQuery, _)

window.addEventListener('DOMContentLoaded', app.main.init)
