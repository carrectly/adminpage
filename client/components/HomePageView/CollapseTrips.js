import React from 'react'
import TableOrdersByStatus from './TableOrdersByStatus'
import {Collapse, Spin} from 'antd'
const {Panel} = Collapse
import moment from 'moment'

const CollapseTrips = props => {
	const orders = props.orders || []
	const hashTable = {}
	let groupedArr

	if (orders.length) {
		orders.forEach(element => {
			if (
				element.status === 'confirmed' ||
				element.status === 'booked new'
			) {
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
				<Panel
					key={index}
					header={`Trip date ${moment(el[0]).format(
						'M/D/YY'
					)}  count ${el[1].length}`}>
					<TableOrdersByStatus ordersArray={el[1]} />
				</Panel>
			))}
		</Collapse>
	)
}

export default CollapseTrips
