import React from 'react'
import TableOrdersByStatus from './TableOrdersByStatus'
import {Collapse, Spin} from 'antd'
const {Panel} = Collapse
import moment from 'moment'

const CollapseByDate = props => {
	console.log('props', props)
	const dateColumn = props.dateColumn
	const orders = props.orders || []
	const hashTable = {}
	let groupedArr

	if (orders.length) {
		orders.forEach(element => {
			let keyName = element[dateColumn]
			if (hashTable.hasOwnProperty(keyName)) {
				hashTable[keyName].push(element)
			} else {
				hashTable[keyName] = [element]
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
					header={`${dateColumn} ${moment(el[0]).format(
						'M/D/YY'
					)}  count ${el[1].length}`}>
					<TableOrdersByStatus ordersArray={el[1]} />
				</Panel>
			))}
		</Collapse>
	)
}

export default CollapseByDate
