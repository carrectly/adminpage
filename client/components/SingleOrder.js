import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getSingleOrderThunk} from '../store/singleorder'
import Gmail from './Gmail'
import Invoice from './Invoice'

class SingleOrder extends Component {
	componentDidMount() {
		this.props.getOrder(this.props.match.params.orderid)
	}

	render() {
		const singleorder = this.props.order || {}
		let arr = []
		for (let [key, value] of Object.entries(singleorder)) {
			arr.push(`${key}: ${value}`)
		}
		return (
			<div>
				<h3>Order Details</h3>
				<div className='singleordercontainer'>
					<table className='orderdetailstable'>
						<tbody>
							{arr.map((details, index) => (
								<tr key={index}>
									<th>{details.split(':')[0]}</th>
									<td>{details.split(':')[1]}</td>
								</tr>
							))}
						</tbody>
					</table>
					<div className='invoiceform'>
						<Invoice />
					</div>
				</div>

				<h3>Order Email History</h3>
				<Gmail />
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		order: state.singleorder,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getOrder: id => dispatch(getSingleOrderThunk(id)),
	}
}
export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(SingleOrder)
)
