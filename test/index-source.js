import * as dialogs from '../index-source'
import {Dialog, Content, Actions, defer, show} from '../index-source'
import FlatButton from 'material-ui/FlatButton'
import React from 'react'

window.showAlert = function (title, message) {
	dialogs.alert(title, message)
		.then(() => alert('Alert has been dismissed'))
}

window.showConfirm = function (title, message) {
	dialogs.confirm(title, message)
		.then(result => alert(`You elected to ${result ? 'proceed' : 'cancel'}.`))
}

window.showPrompt = function (title, message, defaultValue) {
	dialogs.prompt(title, message, defaultValue)
		.then(alert)
}

window.showCustom = function () {

	class App extends React.Component {
		constructor() {
			super()
			this.deferred = defer()

			// below, show(<App />) depends on this property (.promise)
			// to be set so that it knows when to cleanup the DOM
			this.promise = this.deferred.promise
		}
		onClose() {
			this.deferred.resolve()
			this.refs.dlg.close()
		}

		render() {
			return <Dialog ref="dlg">
				<Content>
					Hello
				</Content>
				<Actions>
					<FlatButton label="Okay" onClick={() => this.onClose()} />
				</Actions>
			</Dialog>
		}
	}

	show(<App />).then(() => alert('Dialog closed!'))
}
