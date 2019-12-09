import React, {Component} from 'react'
//var HTMLParser = require('node-html-parser')
//const parse = require('html-react-parser')
import parse from 'html-react-parser'

const SingleEmail = props => {
	console.log('props', props.single.length)

	if (props.single.length) {
		let message = parse(props.single.toString())[0]
		return <div>{message}</div>
	} else {
		return <div>Nothing to Preview</div>
	}
}

export default SingleEmail
