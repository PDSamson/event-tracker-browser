'use strict'

const getFormFields = require('../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

const onSignUp = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
  $('#sign-up').children('input').val('')
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

const addHandlers = function () {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#sign-out').on('submit', onSignOut)
  $('#change-password').on('submit', onChangePassword)
  $('#show-events').on('submit', onShowEvents)
  $('#create-event').on('submit', onCreateEvent)
}

module.exports = {
  addHandlers
}
