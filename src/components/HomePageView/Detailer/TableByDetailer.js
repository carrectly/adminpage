import React, { useEffect } from 'react'
import columns from '../../Table/TableForDetailers'
import { useSelector, useDispatch } from 'react-redux'
import { getDetailerOrdersThunk } from '../../../store/activeOrders'
import CollapseByDate from '../CollapseByDate'

const TableByDetailer = () => {
  const dispatch = useDispatch()
  const orders = useSelector((state) => state.activeOrders)

  useEffect(() => {
    dispatch(getDetailerOrdersThunk())
  }, [])

  return (
    <CollapseByDate
      orders={orders}
      dateColumn="dropoffDate"
      columns={columns}
    />
  )
}

export default TableByDetailer
