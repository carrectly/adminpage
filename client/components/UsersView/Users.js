import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getUsersThunk} from '../../store/users'
import {Table} from 'antd'
import UsersTableColumns from '../Table/UsersTableColumns'

const Users = () => {
	const dispatch = useDispatch()
	const usersArr = useSelector(state => state.users) || []
	const columns = UsersTableColumns()
	useEffect(() => {
		dispatch(getUsersThunk())
	}, [])

	return (
		<Table
			columns={columns}
			dataSource={usersArr}
			pagination={false}
			size='small'
			rowKey='id'
		/>
	)
}

export default Users
