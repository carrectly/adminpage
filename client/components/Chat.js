import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'

class Chat extends Component {
	render() {
		return (
			<div>
				<div>To view Hangouts Chat click "CTRL + SHIFT + 5"</div>
			</div>
		)
	}
}

export default withRouter(connect(null, null)(Chat))
