import React, {useEffect} from 'react'
import CollapseByBothDates from '../HomePageView/CollapseByBothDates'
import {useDispatch, useSelector} from 'react-redux'
import {getConfirmedTripsArray} from '../util'
import {getActiveOrdersThunk} from '../../store/activeOrders'

const confirmedTripsStatusArr = getConfirmedTripsArray()

const AllTripsView = () => {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(getActiveOrdersThunk())
	}, [])

	const orders = useSelector(state => state.activeOrders)

	const confirmedTrips = orders.filter(el =>
		confirmedTripsStatusArr.includes(el.status)
	)

	return <CollapseByBothDates confirmedTrips={confirmedTrips} />
}

export default AllTripsView
