import React from 'react'
import UserRole from '../UsersView/UserRole'

const UserTableColumns = () => [
	{
		title: 'First Name',
		dataIndex: 'firstName',
		key: 'firstName',
	},
	{
		title: 'Last Name',
		dataIndex: 'lastName',
		key: 'description',
	},
	{
		title: 'Email',
		dataIndex: 'email',
		key: 'email',
	},
	{
		title: 'Business Role',
		dataIndex: 'role',
		key: 'role',
		render: (value, row) => <UserRole value={value} row={row} />,
	},
	// {
	// 	title: 'Update Form',
	// 	dataIndex: 'name',
	// 	key: 'id',
	// 	render: (value, row) => <UpdateUser value={value} row={row} />,
	// },
]

export default UserTableColumns
