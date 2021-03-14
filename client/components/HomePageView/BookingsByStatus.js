import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getActiveOrdersThunk} from '../../store/activeOrders'
import TableOrdersByStatus from './TableOrdersByStatus'
import {
	getTakeActionStatusArray,
	getWorkZoneStatusArray,
	getInvoicesStatusArray,
	getQuotesStatusArray,
	getPotentialLeadsStatusArray,
} from '../util'

import {Layout, Menu} from 'antd'
import {
	NotificationOutlined,
	ToolOutlined,
	DollarOutlined,
	PhoneOutlined,
	HourglassOutlined,
} from '@ant-design/icons'

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

	const actionArr = orders.filter(el => actionStatusArr.includes(el.status))

	const workZoneArr = orders.filter(el =>
		workZoneStatusArr.includes(el.status)
	)

	const invoiceArr = orders.filter(el => invoiceStatusArr.includes(el.status))

	const quotesArr = orders.filter(el => quoteStatusArr.includes(el.status))

	const leadsArr = orders.filter(el => leadsStatusArr.includes(el.status))

	const components = {
		1: <TableOrdersByStatus ordersArray={actionArr} />,
		2: <TableOrdersByStatus ordersArray={workZoneArr} />,
		3: <TableOrdersByStatus ordersArray={invoiceArr} />,
		4: <TableOrdersByStatus ordersArray={quotesArr} />,
		5: <TableOrdersByStatus ordersArray={leadsArr} />,
	}

	// TODO: fix padding for menu item set to 0

	return (
		<div>
			<Layout
				className='site-layout-background'
				style={{padding: '24px 0'}}>
				<Sider className='site-layout-background' width={150}>
					<Menu
						mode='vertical'
						defaultSelectedKeys='1'
						defaultOpenKeys='1'
						onClick={handleMenuClick}
						style={{height: '100%', padding: '0'}}>
						<Menu.Item key='1' icon={<NotificationOutlined />}>
							To take action
						</Menu.Item>
						<Menu.Item key='2' icon={<ToolOutlined />}>
							Work Zone
						</Menu.Item>
						<Menu.Item key='3' icon={<DollarOutlined />}>
							Invoices
						</Menu.Item>
						<Menu.Item key='4' icon={<HourglassOutlined />}>
							Quotes
						</Menu.Item>
						<Menu.Item key='5' icon={<PhoneOutlined />}>
							Potential Leads
						</Menu.Item>
					</Menu>
				</Sider>
				<Content style={{padding: '0', minHeight: 280}}>
					{components[render]}
				</Content>
			</Layout>
		</div>
	)
}

export default BookingsByStatus
