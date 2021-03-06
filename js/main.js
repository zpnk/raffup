var app = app || {}

app.main = (function($, _) {

  var $elements = {
    login:        $('.login'),
    meetup:       $('.meetup'),
    meetupTpl:    _.template($('.meetup-tpl').text()),
    attendees:    $('.attendees'),
    attendeesTpl: _.template($('.attendees-tpl').text()),
    winner:       $('.winner'),
    winnerTpl:    _.template($('.winner-tpl').text())
  }

  var attachEvents = function() {
    app.events.subscribe('meetup:got:user',
      [user.init, app.meetup.getMeetup])

    app.events.subscribe('meetup:got:meetup',
      [render.meetup, app.meetup.getAttendees])

    app.events.subscribe('meetup:got:attendees',
      [render.attendees, raffle])

    $elements.login.on('click', sendToMeetup)
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
      app.utils.removeParams()
      $elements.login.hide()
    }
  }

  var render = {
    meetup: function(meetup) {
      var template = $elements.meetupTpl({
        name:  meetup.name,
        time:  new Date(meetup.time).toDateString(),
        rsvps: meetup.yes_rsvp_count,
        who:   meetup.group.who
      })
      $elements.meetup.html(template)
    },

    attendees: function(data) {
      var template = $elements.attendeesTpl({
        attendees: data.results,
        photo:     render.photo
      })
      $elements.attendees.html(template).addClass('bounceInDown')
    },

    winner: function(winner) {
      template = $elements.winnerTpl({
        name:  winner.member.name,
        photo: render.photo(winner)
      })
      $elements.winner.html(template)
      $elements.winner.addClass('bounceInDown')
      $elements.winner.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass('bounceInDown')
      })
    },

    photo: function(user) {
      if ('member_photo' in user) {
        return user.member_photo.photo_link
      } else {
        return 'images/darth.png'
      }
    }
  }

  var raffle = function(attendees) {
    $(document).on('click', '.raffle', function(event) {
      var winner = _.sample(attendees.results)
      render.winner(winner)
    })
  }

  var sendToMeetup = function() {
    var params = {
      client_id:     'mdvcot05523d0o1qfl7rfhjt8a',
      response_type: 'token',
      redirect_uri:  window.location.href
    }
    this.href = this.href + '?' + $.param(params)
  }

  var init = function() {
    attachEvents()
    user.login()
  }

  return {
    init: init,
    user: user
  }

})(jQuery, _)

window.addEventListener('DOMContentLoaded', app.main.init)
