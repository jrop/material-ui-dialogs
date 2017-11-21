import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

import React from 'react'
import ReactDOM from 'react-dom'

// Utility functions {{
function arrify(el) {
	if (typeof el == 'undefined') return []
	return Array.isArray(el) ? el : [el]
}

function defer() {
	const d = {}
	d.promise = new Promise((y, n) => ((d.resolve = y), (d.reject = n)))
	return d
}
// }}

// Helper React Components {{
class DialogContent extends React.Component {
	render() {
		return <div>{this.props.children}</div>
	}
}

class DialogActions extends React.Component {
	getActions() {
		return this.props.children
	}

	render() {
		return <div>{this.props.children}</div>
	}
}

class DialogWrapper extends React.Component {
	constructor(props) {
		super(props)
		this.state = {open: true}
	}

	close() {
		this.setState({open: false})
	}

	render() {
		const [content] = arrify(this.props.children).filter(
			c => c.type == DialogContent
		)
		const [actions] = arrify(this.props.children).filter(
			c => c.type == DialogActions
		)

		return (
			<MuiThemeProvider muiTheme={getMuiTheme()}>
				<Dialog
					{...this.props}
					open={this.state.open}
					actions={arrify(actions.props.children)}>
					{React.cloneElement(content, {ref: 'content'})}
				</Dialog>
			</MuiThemeProvider>
		)
	}
}
// }}

function show(dialog) {
	const div = document.createElement('div')
	document.body.appendChild(div)
	function cleanup() {
		ReactDOM.unmountComponentAtNode(div)
		document.body.removeChild(div)
	}

	const dlg = ReactDOM.render(dialog, div)

	return dlg.promise
		.then(result => {
			setTimeout(() => cleanup(), 2000)
			return result
		})
		.catch(e => {
			setTimeout(() => cleanup(), 2000)
			throw e
		})
}

function alert(title, message) {
	if (typeof message == 'undefined') {
		message = title
		title = 'Alert'
	}

	class DialogContainer extends React.Component {
		constructor() {
			super()
			this.deferred = defer()
			this.promise = this.deferred.promise
		}
		render() {
			return (
				<DialogWrapper title={title} ref="dlg">
					<DialogContent>
						<div>{message}</div>
					</DialogContent>
					<DialogActions>
						<FlatButton
							label="Okay"
							onClick={() => {
								this.deferred.resolve()
								this.refs.dlg.close()
							}}
						/>
					</DialogActions>
				</DialogWrapper>
			)
		}
	}
	return show(<DialogContainer />)
}

function confirm(title, message) {
	if (typeof message == 'undefined') {
		message = title
		title = 'Confirm'
	}

	class DialogContainer extends React.Component {
		constructor() {
			super()
			this.deferred = defer()
			this.promise = this.deferred.promise
		}
		render() {
			return (
				<DialogWrapper title={title} ref="dlg">
					<DialogContent>
						<div>{message}</div>
					</DialogContent>
					<DialogActions>
						<FlatButton
							label="No"
							secondary={true}
							onClick={() => {
								this.deferred.resolve(false)
								this.refs.dlg.close()
							}}
						/>
						<FlatButton
							label="Yes"
							primary={true}
							onClick={() => {
								this.deferred.resolve(true)
								this.refs.dlg.close()
							}}
						/>
					</DialogActions>
				</DialogWrapper>
			)
		}
	}
	return show(<DialogContainer />)
}

function prompt(title, message, defaultValue) {
	if (arguments.length == 1) {
		message = title
		title = 'Prompt'
	}
	defaultValue = defaultValue || ''

	class DialogContainer extends React.Component {
		constructor() {
			super()
			this.state = {text: defaultValue}
			this.deferred = defer()
			this.promise = this.deferred.promise
		}
		render() {
			return (
				<DialogWrapper title={title} ref="dlg">
					<DialogContent>
						<div>
							<div>{this.props.message}</div>
							<div>
								<TextField
									style={{width: '100%'}}
									value={this.state.text}
									name="prompt"
									onChange={(e, text) => this.setState({text})}
								/>
							</div>
						</div>
					</DialogContent>
					<DialogActions>
						<FlatButton
							label="Cancel"
							secondary={true}
							onClick={() => {
								this.deferred.resolve(null)
								this.refs.dlg.close()
							}}
						/>
						<FlatButton
							label="Okay"
							primary={true}
							onClick={() => {
								this.deferred.resolve(this.state.text)
								this.refs.dlg.close()
							}}
						/>
					</DialogActions>
				</DialogWrapper>
			)
		}
	}
	return show(<DialogContainer />)
}

export {
	alert,
	confirm,
	prompt,
	defer,
	show,
	DialogWrapper as Dialog,
	DialogContent as Content,
	DialogActions as Actions,
}
