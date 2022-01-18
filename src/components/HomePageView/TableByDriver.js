import React, {useEffect} from 'react'
import {Table, Collapse, Spin, Alert} from 'antd'
import columns from '../Table/HomeTableForDriversColumns'
import {useSelector, useDispatch} from 'react-redux'
import {getUserOrdersThunk} from '../../store/userorders'
const {Panel} = Collapse
import moment from 'moment'

const pickUpArray = [
	'booked new',
	'booked us',
	'followed up - text',
	'followed up - call',
	'followed up - email',
	'confirmed',
]

const alertHelper = (el1, el2) => {
	if (el1 === 'Invalid date') {
		return (
			<Alert
				message='Invalid dates. Please update order drop off dates'
				type='error'
				showIcon
			/>
		)
	} else if (moment(el1).isSame(moment(), 'day')) {
		return <Alert message="Today's trips" type='warning' showIcon />
	} else if (moment(el1).isBefore(moment())) {
		return (
			<Alert
				message='Trip dates are in the past. Please update order dates'
				type='error'
				showIcon
			/>
		)
	} else {
		return `Trip date ${moment(el1).format('M/D/YY')}  count ${el2.length}`
	}
}

const TableByDriver = props => {
	const email = props.email
	const dispatch = useDispatch()
	const orders = useSelector(state => state.userorders)
	const hashTable = {}
	let groupedArr

	useEffect(() => {
		dispatch(getUserOrdersThunk(email))
	}, [])

	if (orders.length) {
		orders.forEach(element => {
			if (pickUpArray.includes(element.status)) {
				let date = moment(element.pickupDate).format('M/D/YY')
				if (hashTable.hasOwnProperty(date)) {
					hashTable[date].push(element)
				} else {
					hashTable[date] = [element]
				}
			} else {
				let date = moment(element.dropoffDate).format('M/D/YY')
				if (hashTable.hasOwnProperty(date)) {
					hashTable[date].push(element)
				} else {
					hashTable[date] = [element]
				}
			}
		})
		groupedArr = Object.entries(hashTable)
		groupedArr = groupedArr.sort((a, b) => moment(a[0]).diff(moment(b[0])))
	} else {
		return <Spin />
	}

	return (
		<Collapse>
			{groupedArr.map((el, index) => (
				<Panel key={index} header={alertHelper(el[0], el[1])}>
					<Table
						scroll={{x: 'max-content'}}
						columns={columns}
						dataSource={el[1]}
						pagination={false}
						size='small'
						rowKey='hash'
					/>
				</Panel>
			))}
		</Collapse>
	)
}

export default TableByDriver
