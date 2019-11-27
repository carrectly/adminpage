import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'

class Chat extends Component {
	render() {
		return (
			<div>
				<h1>This is user chat</h1>
			</div>
		)
	}
}

export default withRouter(Chat)
