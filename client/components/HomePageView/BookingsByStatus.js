import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getActiveOrdersThunk} from '../../store/activeOrders'
import TableOrdersByStatus from './TableOrdersByStatus'
import CollapseByDate from './CollapseByDate'
import CollapseByBothDates from './CollapseByBothDates'
import {
	getTakeActionStatusArray,
	getWorkZoneStatusArray,
	getInvoicesStatusArray,
	getQuotesStatusArray,
	getPotentialLeadsStatusArray,
	getConfirmedTripsArray,
} from '../util'
import axios from 'axios'
import history from '../../history'

import {Layout, Menu, Input} from 'antd'
import {
	NotificationOutlined,
	ToolOutlined,
	DollarOutlined,
	PhoneOutlined,
	HourglassOutlined,
	MenuOutlined,
	CarOutlined,
} from '@ant-design/icons'
const {Search} = Input
const {Content, Sider} = Layout

const BookingsByStatus = () => {
	const dispatch = useDispatch()
	const [render, updateRender] = useState(1)

	useEffect(() => {
		dispatch(getActiveOrdersThunk())
	}, [])

	const handleMenuClick = menu => {
		updateRender(menu.key)
	}
	const orders = useSelector(state => state.activeOrders)

	const actionStatusArr = getTakeActionStatusArray()
	const workZoneStatusArr = getWorkZoneStatusArray()
	const invoiceStatusArr = getInvoicesStatusArray()
	const quoteStatusArr = getQuotesStatusArray()
	const leadsStatusArr = getPotentialLeadsStatusArray()
	const confirmedTripsStatusArr = getConfirmedTripsArray()

	const actionArr = orders.filter(el => actionStatusArr.includes(el.status))

	const workZoneArr = orders.filter(el =>
		workZoneStatusArr.includes(el.status)
	)

	const invoiceArr = orders.filter(el => invoiceStatusArr.includes(el.status))

	const quotesArr = orders.filter(el => quoteStatusArr.includes(el.status))

	const leadsArr = orders.filter(el => leadsStatusArr.includes(el.status))

	const confirmedTrips = orders.filter(el =>
		confirmedTripsStatusArr.includes(el.status)
	)

	const components = {
		1: <CollapseByDate orders={actionArr} dateColumn='pickupDate' />,
		// 2: <CollapseByDate orders={workZoneArr} dateColumn='pickupDate' />,
		2: <TableOrdersByStatus ordersArray={workZoneArr} />,
		3: <CollapseByBothDates confirmedTrips={confirmedTrips} />,
		4: <TableOrdersByStatus ordersArray={invoiceArr} />,
		5: <TableOrdersByStatus ordersArray={quotesArr} />,
		6: <TableOrdersByStatus ordersArray={leadsArr} />,
	}

	const onSearch = async value => {
		let strValue = value.trim()
		let singleorder
		try {
			singleorder = await axios.get(`/api/orders/single/${strValue}`)
		} catch (e) {
			console.log('order not found', e)
		}

		if (singleorder.data) {
			console.log('order found', singleorder)
			await history.push(`/singleorder/${strValue}`)
		} else {
			window.alert('Order not found')
		}
	}

	return (
		<div>
			<div>
				<Search
					placeholder='search for orders by order id ... '
					onSearch={onSearch}
					enterButton
				/>
			</div>
			<Layout
				className='site-layout-background'
				style={{padding: '24px 0'}}>
				<Menu
					mode='horizontal'
					defaultSelectedKeys='1'
					overflowedIndicator={<MenuOutlined />}
					defaultOpenKeys='1'
					onClick={handleMenuClick}
					style={{height: '100%', padding: '0'}}>
					<Menu.Item key='1' icon={<NotificationOutlined />}>
						To take action
					</Menu.Item>
					<Menu.Item key='2' icon={<ToolOutlined />}>
						Garage
					</Menu.Item>
					<Menu.Item key='3' icon={<CarOutlined />}>
						Trips
					</Menu.Item>
					<Menu.Item key='4' icon={<DollarOutlined />}>
						Invoices
					</Menu.Item>
					<Menu.Item key='5' icon={<HourglassOutlined />}>
						Quotes
					</Menu.Item>
					<Menu.Item key='6' icon={<PhoneOutlined />}>
						Potential Leads
					</Menu.Item>
				</Menu>
				<Content style={{padding: '0', minHeight: 280}}>
					{components[render]}
				</Content>
			</Layout>
		</div>
	)
}

export default BookingsByStatus
