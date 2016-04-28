'use strict'

const Dialog = require('material-ui/lib/dialog')
const FlatButton = require('material-ui/lib/flat-button')
const TextField = require('material-ui/lib/text-field')
const React = require('react')
const ReactDOM = require('react-dom')

class PromisifiedDialog extends React.Component {
	constructor(props) {
		super(props)
		this.state = { open: true }
	}

	cleanup() {
		this.setState({ open: false })

		// now allow time for closing animation to complete,
		// and then remove the DOM node
		const self = this
		setTimeout(function () {
			ReactDOM.unmountComponentAtNode(self.props.div)
			document.body.removeChild(self.props.div)
		}, 2000)
	}

	render() {
		const self = this
		const actions = this.props.options.actions.map(action => React.cloneElement(action, {
			onClick: () => action.props.action(self)
		}))

		return <Dialog
			open={this.state.open}
			actions={actions}
			title={this.props.options.title}>
			{React.cloneElement(this.props.content, { ref: 'content' })}
		</Dialog>
	}
}

function defer() {
	const d = { }
	d.promise = new Promise((y, n) => (d.resolve = y, d.reject = n))
	return d
}

function makeDialogAndWait(options, content) {
	const deferred = defer()
	const div = document.createElement('div')
	document.body.appendChild(div)

	ReactDOM.render(<PromisifiedDialog div={div} deferred={deferred} content={content} options={options} />, div)

	return deferred.promise
}

function alert(title, message) {
	if (typeof message == 'undefined') {
		message = title
		title = 'Alert'
	}

	return makeDialogAndWait({
		title,
		actions: [
			<FlatButton
				label="Okay"
				action={dlg => {
					dlg.props.deferred.resolve()
					dlg.cleanup()
				}} />
		],
	}, <div>{message}</div>)
}

function confirm(title, message) {
	if (typeof message == 'undefined') {
		message = title
		title = 'Confirm'
	}

	return makeDialogAndWait({
		title,
		actions: [
			<FlatButton
				label="No"
				secondary={true}
				action={dlg => {
					dlg.props.deferred.resolve(false)
					dlg.cleanup()
				}} />,
			<FlatButton
				label="Yes"
				primary={true}
				action={dlg => {
					dlg.props.deferred.resolve(true)
					dlg.cleanup()
				}} />
		],
	}, <div>{message}</div>)
}

class PromptComponent extends React.Component {
	getValue() {
		return this.refs.text.getValue()
	}

	render() {
		return <div>
			<div>{this.props.message}</div>
			<div><TextField
				style={{ width: '100%' }}
				defaultValue={this.props.defaultValue}
				ref="text" /></div>
		</div>
	}
}

function prompt(title, message, defaultValue) {
	if (arguments.length == 1) {
		message = title
		title = 'Prompt'
	}
	defaultValue = defaultValue || ''

	return makeDialogAndWait({
		title,
		actions: [
			<FlatButton
				label="Cancel"
				secondary={true}
				action={dlg => {
					dlg.props.deferred.resolve(null)
					dlg.cleanup()
				}} />,
			<FlatButton
				label="Okay"
				primary={true}
				action={dlg => {
					dlg.props.deferred.resolve(dlg.refs.content.getValue())
					dlg.cleanup()
				}} />
		],
	}, <PromptComponent message={message} defaultValue={defaultValue} />)
}

module.exports = {
	alert, confirm, prompt
}
