import React from 'react'
import DefaultTable from './DefaultTable'
import { Collapse, Spin } from 'antd'
const { Panel } = Collapse
import moment from 'moment'
import { panelHeaderHelper } from '../Shared/CollapsePanelHelper'

const CollapseByDate = (props) => {
  const dateColumn = props.dateColumn
  const orders = props.orders || []
  const cols = props.columns || []
  const hashTable = {}
  let groupedArr

  if (orders.length) {
    orders.forEach((element) => {
      let date = moment(element[dateColumn]).format('M/D/YY')
      if (hashTable.hasOwnProperty(date)) {
        hashTable[date].push(element)
      } else {
        hashTable[date] = [element]
      }
    })
    groupedArr = Object.entries(hashTable)
    console.log('grouped array', groupedArr)
    groupedArr = groupedArr.sort((a, b) => new Date(a[0]) - new Date(b[0]))
  } else {
    return <Spin />
  }

  return (
    <Collapse defaultActiveKey={['0']}>
      {groupedArr.map((el, index) => (
        <Panel key={index} header={panelHeaderHelper(el[0], el[1])}>
          <DefaultTable ordersArray={el[1]} columns={cols} />
        </Panel>
      ))}
    </Collapse>
  )
}

export default CollapseByDate
