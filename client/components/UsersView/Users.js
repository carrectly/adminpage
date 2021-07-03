import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getUsersThunk} from '../../store/users'

const Users = () => {
	const dispatch = useDispatch()
	const usersArr = useSelector(state => state.users) || []
	useEffect(() => {
		dispatch(getUsersThunk())
	}, [])

	return usersArr.map(user => <div key={user.id}>{user.email}</div>)
}

export default Users
