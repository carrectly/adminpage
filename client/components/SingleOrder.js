import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getSingleOrderThunk} from '../store/singleorder'
import Gmail from './Gmail'
import Invoice from './Invoice'
import {Table} from 'react-bootstrap'
import UpdateOrder from './UpdateOrder'

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
					<Table striped bordered hover variant='dark'>
						<tbody>
							{arr.map((details, index) => (
								<tr key={index}>
									<th>{details.split(':')[0]}</th>
									<td>{details.split(':')[1]}</td>
								</tr>
							))}
						</tbody>
					</Table>
					<div className='invoiceform'>
						<UpdateOrder id={this.props.match.params.orderid} />
						<Invoice />
					</div>
				</div>
				<br />
				<div>
					<Table striped bordered hover size='sm' variant='dark'>
						<thead>
							<tr>
								<th>Service</th>
								<th>Customer Price</th>
								<th>Dealer Price</th>
								<th>Update Customer Price</th>
								<th>Update Dealer Price</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Fuel Up</td>
								<td>$10</td>
								<td></td>
								<td>
									<input
										name='location'
										type='text'
										placeholder='$$$'
									/>
								</td>
								<td>
									<input
										name='location'
										type='text'
										placeholder='$$$'
									/>
								</td>
							</tr>
							<tr>
								<td colSpan='5'>
									<button type='button'>Update prices</button>
								</td>
							</tr>
						</tbody>
					</Table>
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
