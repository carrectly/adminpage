import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'

class Menu extends Component {
	render() {
		return (
			<div>
				<h4>To view Hangouts Chat press "CTRL + SHIFT + 5"</h4>
			</div>
		)
	}
}

export default withRouter(connect(null, null)(Menu))
