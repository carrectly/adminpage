import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {
	getSingleOrderThunk,
	updateOrderDetailsThunk,
	removeOrderServiceThunk,
} from '../../store/singleorder'
import {LocationCell, StatusCell} from '../Table/Cells.js'
import SingleOrderEmails from './SingleOrderEmails'
import Invoice from './Invoice'
import UpdateOrder from './UpdateOrder'
import {getEmailsThunk, clearEmailsThunk} from '../../store/emails'
import {clearSingleEmailThunk} from '../../store/singleemail'
import SingleOrderServices from './SingleOrderServices'
import moment from 'moment'
import {Descriptions, Tabs} from 'antd'
import OrderComments from './OrderComments'
import './styles.scss'

const {TabPane} = Tabs

class SingleOrder extends Component {
	constructor(props) {
		super(props)
		this.handleServiceUpdate = this.handleServiceUpdate.bind(this)
		this.handleRemoveService = this.handleRemoveService.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.fetchEmails = this.fetchEmails.bind(this)
		this.state = {}
	}

	handleChange(evt) {
		if (!this.state[evt.target.id]) {
			this.setState({
				[evt.target.id]: {
					[evt.target.name]: evt.target.value,
				},
			})
		} else {
			let temp = this.state[evt.target.id]
			this.setState({
				[evt.target.id]: {...temp, [evt.target.name]: evt.target.value},
			})
		}
	}

	async fetchEmails() {
		let id = this.props.match.params.orderid
		try {
			await this.props.getEmails(id)
		} catch (err) {
			console.log(err)
		}
	}

	handleServiceUpdate(evt) {
		evt.preventDefault()
		let obj = {...this.state}
		let id = this.props.match.params.orderid
		this.props.updateServices(id, obj)
		obj = {}
		this.setState({})
	}

	handleRemoveService(evt) {
		let obj = {
			serviceid: evt.target.id,
		}
		let orderid = this.props.match.params.orderid
		this.props.removeService(orderid, obj)
		obj = {}
		this.setState({})
	}

	componentDidMount() {
		this.props.getOrder(this.props.match.params.orderid)
	}

	componentWillUnmount() {
		this.props.clearEmails()
		this.props.clearSingleEmail()
	}

	// eslint-disable-next-line complexity
	render() {
		const singleorder = this.props.order || {}
		const services = this.props.order.services || []
		const customer = singleorder.customer || {}
		let arr = []

		for (let [key, value] of Object.entries(singleorder)) {
			if (key !== 'services') {
				if (key === 'customer') {
					arr.push([`${key}`, `${value.firstName} ${value.lastName}`])
				} else if (
					key === 'dropoffDate' ||
					key === 'pickupDate' ||
					key === 'createdAt' ||
					key === 'updatedAt'
				) {
					let tempDate = moment(value).format('M/D/YY hh:mm A')
					arr.push([`${key}`, `${tempDate}`])
				} else {
					arr.push([`${key}`, `${value}`])
				}
			}
		}

		return (
			<div>
				<div className='singleordercontainer'>
					<div className='singleordertable'>
						<Tabs type='card'>
							<TabPane tab='Order Details' key='1'>
								<Descriptions
									layout='vertical'
									column={{
										xxl: 3,
										xl: 2,
										lg: 2,
										md: 2,
										sm: 1,
										xs: 1,
									}}>
									<Descriptions.Item>
										<Descriptions
											title='Order'
											layout='horizontal'
											bordered={false}
											column={1}
											size='small'
											className='descriptionsAntd'>
											<Descriptions.Item label='Order ID'>
												{singleorder.hash}
											</Descriptions.Item>
											<Descriptions.Item label='Status'>
												<StatusCell
													value={singleorder.status}
												/>
											</Descriptions.Item>
											<Descriptions.Item label='Pickup Date'>
												{moment(
													singleorder.pickupDate
												).format('M/D/YY hh:mm A')}
											</Descriptions.Item>
											<Descriptions.Item label='Drop Off Date'>
												{moment(
													singleorder.dropoffDate
												).format('M/D/YY hh:mm A')}
											</Descriptions.Item>
											<Descriptions.Item label='Pickup Location'>
												<LocationCell
													value={
														singleorder.pickupLocation
													}
												/>
											</Descriptions.Item>
											<Descriptions.Item label='PROMO CODE'>
												{singleorder.promoCode}
											</Descriptions.Item>
											<Descriptions.Item label='Discount'>
												{singleorder.discount}
											</Descriptions.Item>
											<Descriptions.Item label='Flexible on Time'>
												{singleorder.flexibleOnTime}
											</Descriptions.Item>
											<Descriptions.Item label='Created at'>
												{moment(
													singleorder.createAt
												).format('M/D/YY hh:mm A')}
											</Descriptions.Item>
											<Descriptions.Item label='Updated at'>
												{moment(
													singleorder.updatedAt
												).format('M/D/YY hh:mm A')}
											</Descriptions.Item>
										</Descriptions>
									</Descriptions.Item>

									<Descriptions.Item>
										<Descriptions
											title='Car'
											layout='horizontal'
											bordered={false}
											size='small'
											column={1}
											className='descriptionsAntd'>
											<Descriptions.Item label='Car Make'>
												{singleorder.carMake}
											</Descriptions.Item>
											<Descriptions.Item label='Car Model'>
												{singleorder.carModel}
											</Descriptions.Item>
											<Descriptions.Item label='Car Year'>
												{singleorder.carYear}
											</Descriptions.Item>
											<Descriptions.Item label='VIN'>
												{singleorder.vin}
											</Descriptions.Item>
											<Descriptions.Item label='Stick shift'>
												{singleorder.stickShift}
											</Descriptions.Item>
										</Descriptions>
									</Descriptions.Item>

									<Descriptions.Item>
										<Descriptions
											title='Customer'
											layout='horizontal'
											bordered={false}
											size='small'
											column={1}
											className='descriptionsAntd'>
											<Descriptions.Item label='Customer Phone Number'>
												{customer.phoneNumber}
											</Descriptions.Item>
											<Descriptions.Item label='Customer Name'>
												<Link
													to={`/singlecustomer/${customer.phoneNumber}`}>
													{customer.firstName}{' '}
													{customer.lastName}
												</Link>
											</Descriptions.Item>
											<Descriptions.Item label='Customer Comments'>
												{singleorder.customerComments}
											</Descriptions.Item>
										</Descriptions>
									</Descriptions.Item>
								</Descriptions>
							</TabPane>
							<TabPane tab='Change log' key='2'>
								Change log coming soon ...
							</TabPane>
						</Tabs>
						<SingleOrderEmails fetchEmails={this.fetchEmails} />
					</div>
					<div className='invoiceform'>
						<UpdateOrder id={this.props.match.params.orderid} />
						<Invoice
							fetchEmails={this.fetchEmails}
							id={this.props.match.params.orderid}
						/>
						<SingleOrderServices services={services} />
						<OrderComments id={this.props.match.params.orderid} />
					</div>
				</div>
				<br />
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
		updateServices: (id, obj) => dispatch(updateOrderDetailsThunk(id, obj)),
		getEmails: id => dispatch(getEmailsThunk(id)),
		removeService: (id, obj) => dispatch(removeOrderServiceThunk(id, obj)),
		clearEmails: () => dispatch(clearEmailsThunk()),
		clearSingleEmail: () => dispatch(clearSingleEmailThunk()),
	}
}
export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(SingleOrder)
)
