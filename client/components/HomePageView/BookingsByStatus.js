import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getActiveOrdersThunk} from '../../store/activeOrders'
import TableOrdersByStatus from './TableOrdersByStatus'
import {
	getTakeActionStatusArray,
	getWorkZoneStatusArray,
	getInvoicesStatusArray,
	getQuotesStatusArray,
	getPotentialLeadsStatusArray,
} from '../util'

import {Collapse} from 'antd'
const {Panel} = Collapse

class BookingsByStatus extends Component {
	async componentDidMount() {
		try {
			await this.props.getActiveOrders()
		} catch (err) {
			console.log(err)
		}
	}

	render() {
		const orders = this.props.orders || []

		const actionStatusArr = getTakeActionStatusArray()
		const workZoneStatusArr = getWorkZoneStatusArray()
		const invoiceStatusArr = getInvoicesStatusArray()
		const quoteStatusArr = getQuotesStatusArray()
		const leadsStatusArr = getPotentialLeadsStatusArray()

		const actionArr = orders.filter(el =>
			actionStatusArr.includes(el.status)
		)

		const workZoneArr = orders.filter(el =>
			workZoneStatusArr.includes(el.status)
		)

		const invoiceArr = orders.filter(el =>
			invoiceStatusArr.includes(el.status)
		)

		const quotesArr = orders.filter(el =>
			quoteStatusArr.includes(el.status)
		)

		const leadsArr = orders.filter(el => leadsStatusArr.includes(el.status))

		return (
			<div>
				<Collapse defaultActiveKey={['1', '2']}>
					<Panel header='TO TAKE ACTION' key='1'>
						<TableOrdersByStatus ordersArray={actionArr} />
					</Panel>
					<Panel header='WORK ZONE' key='2'>
						<TableOrdersByStatus ordersArray={workZoneArr} />
					</Panel>
					<Panel header='INVOICES' key='3'>
						<TableOrdersByStatus ordersArray={invoiceArr} />
					</Panel>
					<Panel header='QUOTES' key='4'>
						<TableOrdersByStatus ordersArray={quotesArr} />
					</Panel>
					<Panel header='POTENTIAL LEADS' key='5'>
						<TableOrdersByStatus ordersArray={leadsArr} />
					</Panel>
				</Collapse>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		orders: state.activeOrders,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getActiveOrders: () => dispatch(getActiveOrdersThunk()),
	}
}
export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(BookingsByStatus)
)
