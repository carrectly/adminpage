import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Descriptions, Tabs, Button, Dropdown, Menu} from 'antd'
import {Link, useParams} from 'react-router-dom'
const {TabPane} = Tabs
import moment from 'moment'
import {
	LocationCell,
	StatusCell,
	ConciergeCell,
	GoogleVoiceLinkCell,
} from '../Table/Cells.js'
import {getStatusArray} from '../util'
import {updateSingleOrderThunk} from '../../store/singleorder'
import './styles.scss'

const statusArray = getStatusArray()

const menuList = fn => {
	return (
		<Menu onClick={fn}>
			{statusArray.map((status, index) => (
				<Menu.Item key={status} id={index}>
					{status}
				</Menu.Item>
			))}
		</Menu>
	)
}

const SingleOrderDetails = props => {
	const dispatch = useDispatch()
	const params = useParams()
	const orderId = params.orderid
	const singleorder = props.order
	const pickUpDriver = props.pickUpDriver.name
	const returnDriver = props.returnDriver.name
	const customer = props.customer
	const drivers = useSelector(state => state.drivers)

	const handleStatusUpdate = e => {
		console.log('changing status evt', e.key)
		let obj = {
			status: e.key,
		}
		if (e.key === 'cancelled') {
			if (
				window.confirm(
					'Changing the status to cancelled will remove the order from the home page and will move it to archives. Do you want to proceed?'
				)
			) {
				dispatch(updateSingleOrderThunk(orderId, obj))
			} else {
				console.log('changed my mind')
			}
		} else if (e.key === 'paid') {
			if (
				window.confirm(
					'Changing the status to paid will remove the order from the home page and will move it to archives. Do you want to proceed?'
				)
			) {
				dispatch(updateSingleOrderThunk(orderId, obj))
			} else {
				console.log('changed my mind')
			}
		} else {
			dispatch(updateSingleOrderThunk(orderId, obj))
		}
	}

	return (
		<Tabs type='card' style={{margin: '0px 0px 10px 0px'}}>
			<TabPane tab='Order Details' key='1'>
				<Descriptions
					className='order-descriptions'
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
							size='small'>
							<Descriptions.Item label='Order ID'>
								{singleorder.hash}
							</Descriptions.Item>
							<Descriptions.Item label='Status'>
								<Dropdown
									overlay={() =>
										menuList(handleStatusUpdate)
									}>
									<Button
										size='small'
										style={{padding: '0px'}}>
										<StatusCell
											value={singleorder.status}
											dropDown={true}
										/>
									</Button>
								</Dropdown>
							</Descriptions.Item>
							<Descriptions.Item label='Pickup Date'>
								{moment(singleorder.pickupDate).format(
									'M/D/YY hh:mm A'
								)}
							</Descriptions.Item>
							<Descriptions.Item label='Drop Off Date'>
								{moment(singleorder.dropoffDate).format(
									'M/D/YY hh:mm A'
								)}
							</Descriptions.Item>
							<Descriptions.Item label='Pickup Location'>
								<LocationCell
									value={singleorder.pickupLocation}
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
								{moment(singleorder.createAt).format(
									'M/D/YY hh:mm A'
								)}
							</Descriptions.Item>
							<Descriptions.Item label='Updated at'>
								{moment(singleorder.updatedAt).format(
									'M/D/YY hh:mm A'
								)}
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
								<GoogleVoiceLinkCell
									value={customer.phoneNumber}
								/>
							</Descriptions.Item>
							<Descriptions.Item label='Customer Name'>
								<Link
									to={`/singlecustomer/${customer.phoneNumber}`}>
									{customer.firstName} {customer.lastName}
								</Link>
							</Descriptions.Item>
							<Descriptions.Item label='Customer Comments'>
								{singleorder.customerComments}
							</Descriptions.Item>
						</Descriptions>
					</Descriptions.Item>

					<Descriptions.Item>
						<Descriptions
							title='Driver'
							layout='horizontal'
							bordered={false}
							size='small'
							column={1}
							className='descriptionsAntd'>
							<Descriptions.Item label='Concierge'>
								<ConciergeCell value={singleorder.concierge} />
							</Descriptions.Item>
							<Descriptions.Item label='Driver picking up'>
								<ConciergeCell value={pickUpDriver} />
							</Descriptions.Item>
							<Descriptions.Item label='Driver dropping off'>
								<ConciergeCell value={returnDriver} />
							</Descriptions.Item>
						</Descriptions>
					</Descriptions.Item>
				</Descriptions>
			</TabPane>
			<TabPane tab='Change log' key='2'>
				Change log coming soon ...
			</TabPane>
		</Tabs>
	)
}

export default SingleOrderDetails
