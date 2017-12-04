'use strict'

const getFormFields = require('../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('./store')

const onSignUp = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const onSignIn = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
  $('#sign-in').children('input').val('')
}

const onSignOut = function (event) {
  event.preventDefault()
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

const onChangePassword = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.changePassword(data)
    .then(ui.changeSuccess)
    .catch(ui.changeFailure)
  $('#change-password').children('input').val('')
}

const onShowEvents = function (event) {
  event.preventDefault()
  api.showEvents()
    .then(ui.showSuccess)
    .catch(ui.showFailure)
}

const onCreateEvent = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.createEvent(data)
    .then(ui.createSuccess)
    .catch(ui.createFailure)
  $('#create-event').children('input').val('')
}

const onUpdateEvent = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.updateEvent(data)
    .then(ui.updateSuccess)
    .catch(ui.updateFailure)
}

const onFindEvent = function (event) {
  store.title = $('#find-title').val()
  event.preventDefault()
  api.showEvents()
    .then(ui.otherFindSuccess)
    .catch(ui.showFailure)
}

const addHandlers = function () {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#sign-out').on('submit', onSignOut)
  $('#change-password').on('submit', onChangePassword)
  $('#show-events').on('submit', onShowEvents)
  $('#create-event').on('submit', onCreateEvent)
  $('#update-event').on('submit', onUpdateEvent)
  $('#find-event').on('submit', onFindEvent)
}

module.exports = {
  addHandlers
}
