import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'

class Gmail extends Component {
	async componentDidMount() {
		console.log('mounted')
		const res = await axios.get('/auth/google/gmail')
		console.log('mounted for sure')
	}
	render() {
		return (
			<div>
				<h1>Gmail coming soon</h1>
			</div>
		)
	}
}

export default withRouter(connect(null, null)(Gmail))
