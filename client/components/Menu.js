import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'

class Menu extends Component {
	render() {
		return (
			<div>
				<div className='chat'>
					To view Hangouts Chat press "CTRL + SHIFT + 5"
				</div>
			</div>
		)
	}
}

export default withRouter(connect(null, null)(Menu))
