import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getContactsThunk } from '../../store/contacts'
import AndtDCustomerTable from './AntDCustomersTable'

const AllCustomers = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    setLoading(true)
    dispatch(getContactsThunk())
    setLoading(false)
  }, [])

  return <AndtDCustomerTable loading={loading} />
}

export default AllCustomers
