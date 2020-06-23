import React, {Component} from 'react'
//var HTMLParser = require('node-html-parser')
//const parse = require('html-react-parser')
import parse from 'html-react-parser'
var DomParser = require('dom-parser')
var parser = new DomParser()
import renderHTML from 'react-render-html'
import nl2br from 'react-newline-to-break'

class SingleEmail extends Component {
	render() {
		let message = 'Nothing to Preview'
		if (this.props.single.length) {
			message = this.props.single
		}
		return <div>{renderHTML(message)}</div>
	}
}

export default SingleEmail
