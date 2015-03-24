var app = app || {}

app.main = (function($, _) {

  var $elements = {
    login:     $('.login'),
    meetup:    $('.meetup'),
    meetupTpl: _.template($('.meetup-tpl').text()),
    rsvps:     $('.rsvps'),
    rsvpsTpl:  _.template($('.rsvps-tpl').text())
  }

  var attachEvents = function() {
    app.events.subscribe('meetup:got:user', function(data) {
      user.init(data)
      app.meetup.getMeetup()
    })

    app.events.subscribe('meetup:got:meetup', render.meetup)

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
        app.meetup.getUser()
      }
    },
    init: function(data) {
      user.name = data.name
      user.id   = data.id
      $elements.login.hide()
    }
  }

  var render = {
    meetup: function(data) {
      var template = $elements.meetupTpl(data)
      $elements.meetup.html(template)
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
