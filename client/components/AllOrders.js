import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getAllOrdersThunk} from '../store/orders'

class AllOrders extends Component {
	render() {
		const orders = this.props.orders || []
		return (
			<div>
				<div>
					<h1>Orders coming soon</h1>
					<button
						type='button'
						onClick={() => this.props.getOrders()}>
						View All Orders
					</button>
				</div>
				<div>
					{orders.map(ord => (
						<li key={ord.ID}>{ord.user_email}</li>
					))}
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		orders: state.orders,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getOrders: () => dispatch(getAllOrdersThunk()),
	}
}
export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(AllOrders)
)
