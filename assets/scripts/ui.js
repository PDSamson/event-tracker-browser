'use strict'
const store = require('./store')
const api = require('./api')
const showEventsTemplate = require('./templates/event-listing.handlebars')

const signUpSuccess = function () {
  $('#feedback-message').text('Sign-up Successful')
  $('#sign-up').children('input').val('')
}

const signUpFailure = function () {
  $('#feedback-message').text('Sign-up Failure')
}

const signInSuccess = function (data) {
  $('#feedback-message').text('Sign-in Success')
  $('.sign-in-page').hide()
  $('.content-page').show()
  store.user = data.user
}

const signInFailure = function () {
  $('#feedback-message').text('Sign-in Failure')
}

const signOutSuccess = function () {
  $('#feedback-message').text('Sign out Success')
  store.user = null
  $('.event-container').empty()
  $('.content-page').hide()
  $('#show-events').hide()
  $('.sign-in-page').show()
}

const signOutFailure = function () {
  $('#feedback-message').text('Sign-out Failure')
}

const changeSuccess = function () {
  $('#feedback-message').text('Password change successful')
}

const changeFailure = function () {
  $('#feedback-message').text('Password change failed')
}

const deleteSuccess = function (event) {
  $('#feedback-message').text('Event Deleted')
  $(event.target).parent().remove()
}

const deleteFailure = function () {
  $('#feedback-message').text('Deletion Failed')
}

const findSuccess = function (data) {
  const event = data.event
  $('#feedback-message').text('Event retrieved')
  $('#update-title').attr('value', event.title)
  $('#update-location').attr('value', event.location)
  $('#update-dresscode').attr('value', event.dresscode)
  $('#update-date').attr('value', event.date)
  $('#update-attendees').attr('value', event.attendees)
  $('#update-event').show()
}

const findFailure = function () {
  $('#feedback-message').text('Event not found')
}

const populateUpdateFields = function (id) {
  api.findEvent(id)
    .then(findSuccess)
    .catch(findFailure)
}

const checkSuccess = function (data) {
  if (data.events.length !== 0) {
    $('#show-events').show()
  } else {
    $('#show-events').hide()
  }
}

const showFailure = function () {
  $('#feedback-message').text('Events could not be retrieved')
}

const checkEvents = function () {
  api.showEvents()
    .then(checkSuccess)
    .catch(showFailure)
}

const showSuccess = function (data) {
  $('.event-container').empty()
  const showEventsHtml = showEventsTemplate({ events: data.events })
  $('.event-container').append(showEventsHtml)
  $('.remove').on('click', function (e) {
    e.preventDefault()
    api.deleteEvent($(e.target).parent().data('id'))
      .then(deleteSuccess(e))
      .then(checkEvents)
      .catch(deleteFailure)
  })
  $('.update').on('click', function (e) {
    e.preventDefault()
    store.id = $(e.target).parent().data('id')
    populateUpdateFields(store.id)
  })
}

const createSuccess = function () {
  $('#feedback-message').text('Event Created')
  $('#show-events').show()
}

const createFailure = function () {
  $('#feedback-message').text('Event Creation Failed')
}

const updateSuccess = function () {
  $('#update-event').hide()
  $('#feedback-message').text('Update Complete')
  api.showEvents()
    .then(showSuccess)
    .catch(showFailure)
}

const updateFailure = function () {
  populateUpdateFields(store.id)
  $('#feedback-message').text('Update Failed')
}

const otherFindSuccess = function (data) {
  console.log(data.events)
  const foundData = data.events.filter(event => event.title === store.title)
  if (foundData === []) {
    $('#feedback-message').text('No event found')
  } else {
    showSuccess(foundData)
  }
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  changeSuccess,
  changeFailure,
  showSuccess,
  showFailure,
  createSuccess,
  createFailure,
  updateSuccess,
  updateFailure,
  otherFindSuccess,
  checkEvents,
  checkSuccess
}
