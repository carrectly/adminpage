import React from 'react'
import TableOrdersByStatus from './TableOrdersByStatus'
import { Collapse, Spin, Alert } from 'antd'
const { Panel } = Collapse
import moment from 'moment'

const alertHelper = (el1, el2) => {
  if (el1 === 'Invalid date') {
    return (
      <Alert
        message="Invalid dates. Please update order drop off dates"
        type="error"
        showIcon
      />
    )
  } else if (moment(el1).isSame(moment(), 'day')) {
    return <Alert message="Today's trips" type="warning" showIcon />
  } else if (moment(el1).isBefore(moment())) {
    return (
      <Alert
        message="Trip dates are in the past. Please update order dates"
        type="error"
        showIcon
      />
    )
  } else {
    return `Trip date ${moment(el1).format('M/D/YY')}  count ${el2.length}`
  }
}

const CollapseTrips = (props) => {
  const orders = props.orders || []
  const hashTable = {}
  let groupedArr

  if (orders.length) {
    orders.forEach((element) => {
      if (element.status === 'confirmed' || element.status === 'booked new') {
        let date = moment(element.pickupDate).format('M/D/YY')
        if (Object.prototype.hasOwnProperty.call(hashTable, date)) {
          hashTable[date].push(element)
        } else {
          hashTable[date] = [element]
        }
      } else {
        let date = moment(element.dropoffDate).format('M/D/YY')
        if (Object.prototype.hasOwnProperty.call(hashTable, date)) {
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
          <TableOrdersByStatus ordersArray={el[1]} />
        </Panel>
      ))}
    </Collapse>
  )
}

export default CollapseTrips
