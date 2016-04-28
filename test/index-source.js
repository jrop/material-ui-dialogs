'use strict'

const muiDlgs = require('../index')

window.showAlert = function (title, message) {
  muiDlgs.alert(title, message)
  .then(() => alert('Alert has been dismissed'))
}

window.showConfirm = function (title, message) {
  muiDlgs.confirm(title, message)
    .then(result => alert(`You elected to ${result ? 'proceed' : 'cancel'}.`))
}

window.showPrompt = function (title, message, defaultValue) {
  muiDlgs.prompt(title, message, defaultValue)
    .then(alert)
}
