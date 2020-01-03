import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
/**
 * COMPONENT
 */

class UserHome extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentDidMount() {
		//console.log(this.props)
		this.setState({})
	}

	render() {
		//console.log(this.props)
		const email = this.props.email || ''

		return (
			<div>
				<h1>Welcome, {email}</h1>
			</div>
		)
	}
}

/**
 * CONTAINER
 */
const mapState = state => {
	return {
		email: state.user.email,
	}
}

export default withRouter(connect(mapState)(UserHome))
