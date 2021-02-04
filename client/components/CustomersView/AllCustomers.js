import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getContactsThunk} from '../../store/contacts'
import AndtDCustomerTable from './AntDCustomersTable'

const AllCustomers = () => {
	const [loading, setLoading] = useState(false)
	const dispatch = useDispatch()

	useEffect(() => {
		console.log('use effect')
		setLoading(true)
		dispatch(getContactsThunk())
		setLoading(false)
	}, [])

	return <AndtDCustomerTable loading={loading} />
}

export default AllCustomers
