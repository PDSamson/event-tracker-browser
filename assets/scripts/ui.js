'use strict'
const store = require('./store')
const api = require('./api')
const showEventsTemplate = require('./templates/event-listing.handlebars')

const signUpSuccess = function () {
  $('#feedback-message').text('Sign-up Successful')
}

const signUpFailure = function () {
  $('#feedback-message').text('Sign-up Failure')
}

const signInSuccess = function (data) {
  $('#feedback-message').text('Sign-in Success')
  store.user = data.user
}

const signInFailure = function () {
  $('#feedback-message').text('Sign-in Failure')
}

const signOutSuccess = function () {
  $('#feedback-message').text('Sign out Success')
  store.user = null
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

const showSuccess = function (data) {
  console.log(data.events)
  const showEventsHtml = showEventsTemplate({ events: data.events })
  $('.event-container').append(showEventsHtml)
  $('.remove').on('click', function (e) {
    e.preventDefault()
    api.deleteEvent($(e.target).parent().data('id'))
      .then(deleteSuccess(e))
      .catch(deleteFailure)
  })
}

const showFailure = function () {
  $('#feedback-message').text('Events could not be retrieved')
}

const createSuccess = function () {
  $('#feedback-message').text('Event Created')
}

const createFailure = function () {
  $('#feedback-message').text('Event Creation Failed')
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
  createFailure
}
