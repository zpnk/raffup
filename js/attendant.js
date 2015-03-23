var app = app || {}

app.attendant = (function($, _) {
  var Attendant = function(data) {
    this.name     = data.name
    this.photo    = createPhoto(data.photo)
    this.meetupId = data.member_id
    this.raffleId = app.utils.generateId()
  }

  var createAttendant = function(data) {
    return new Attendant(data)
  }

  var createPhoto = function(data) {
    if (!data.photo_id) return defaultPhoto()

    return {
      photoId:     data.photo_id,
      thumbLink:   data.thumb_link,
      photoLink:   data.photo_link,
      highresLink: data.highres_link
    }
  }

  var defaultPhoto = function() {
    var defaultPhotoUrl = 'https://en.gravatar.com/userimage/52437198/f4817e93eaa2125939b702b6102d30cc.jpg'
    return {
      photoId:      NaN,
      thumbLink:    defaultPhotoUrl + '?50',
      photoLink:    defaultPhotoUrl + '?200',
      highresLink:  defaultPhotoUrl + '?1000'
    }
  }

  var getMemberWithPhoto = function(data) {
    var member   = _.assign({}, data.member)
    var photo    = _.assign({}, data.member_photo)
    member.photo = photo
    return member
  }

  var createAttendants = function(data) {
    var rsvps      = data.results
    var attendants = rsvps.map(getMemberWithPhoto).map(createAttendant)
    return attendants
  }

  return {
    model: Attendant,
    createAttendants: createAttendants
  }
})(jQuery, _)
