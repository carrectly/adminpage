import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import {getTokenThunk} from '../store/user'

class Tokens extends Component {
	render() {
		return (
			<div>
				<div>Token</div>
				<div>{this.props.user.token}</div>
				<Button onClick={() => this.props.handleClick()}>
					Update Token
				</Button>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		user: state.user,
	}
}

const mapDispatch = dispatch => {
	return {
		handleClick: () => dispatch(getTokenThunk()),
	}
}

export default withRouter(connect(mapStateToProps, mapDispatch)(Tokens))
