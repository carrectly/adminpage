import React from 'react'
import UpdateService from '../ServicesTableView/UpdateService.js'

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
		title: 'Update Form',
		dataIndex: 'name',
		key: 'id',
		render: (value, row) => <UpdateService value={value} row={row} />,
	},
]

export default UserTableColumns
