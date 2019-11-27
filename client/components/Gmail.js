import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'

class Gmail extends Component {
	render() {
		return (
			<div>
				<h1>This is gmail window</h1>
			</div>
		)
	}
}

export default withRouter(Gmail)
