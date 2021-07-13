import React from 'react'
import UserRole from '../UsersView/UserRole'
import {DeleteUserCell} from './Cells'

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
	{
		title: 'Delete User',
		dataIndex: 'id',
		key: 'id',
		render: (value, row) => <DeleteUserCell value={value} row={row} />,
	},
]

export default UserTableColumns
