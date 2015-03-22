var app = app || {}

app.main = (function($, _) {

  var $elements = {
    login:          $('.login'),
    welcome:        $('.welcome'),
    meetups:        $('.meetups'),
    attendants:     $('.attendants'),
    welcomeTpl:     _.template($('.welcome-tpl').text()),
    meetupsTpl:     _.template($('.meetups-tpl').text()),
    attendantsTpl:  _.template($('.attendants-tpl').text())
  }

  var attachEvents = function() {
    app.events.subscribe('meetup:got:currentUser', function(data) {
      user.init(data)
      app.meetup.getRecentMeetups()
    })

    app.events.subscribe('meetup:got:recentMeetups', render.meetups)
    app.events.subscribe('meetup:got:rsvps', render.attendants)

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
      render.welcome()
    }
  }

  var render = {
    meetups: function(data) {
      $elements.meetups.html($elements.meetupsTpl({meetups: data.results}))
    },
    attendants: function(data) {
      var attendants = app.attendant.createAttendants(data)
      $elements.attendants.html($elements.attendantsTpl({attendants: attendants}))
    },
    welcome: function() {
      $elements.login.hide()
      $elements.welcome.html($elements.welcomeTpl({name: user.name}))
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
