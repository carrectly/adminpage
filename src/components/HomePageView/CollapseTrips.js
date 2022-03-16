import React from 'react'
import DefaultTable from './DefaultTable'
import { Collapse, Spin } from 'antd'
const { Panel } = Collapse
import moment from 'moment'
import { panelHeaderHelper } from '../Shared/CollapsePanelHelper'

const CollapseTrips = (props) => {
  const orders = props.orders || []
  const hashTable = {}
  let groupedArr

  if (orders.length) {
    orders.forEach((element) => {
      if (element.status === 'confirmed' || element.status === 'booked new') {
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
        <Panel key={index} header={panelHeaderHelper(el[0], el[1])}>
          <DefaultTable ordersArray={el[1]} type={props.type} />
        </Panel>
      ))}
    </Collapse>
  )
}

export default CollapseTrips
