import React from 'react'
import UserRole from '../UsersView/UserRole'
import UserColorTags from '../UsersView/UserColorTags'
import { DeleteUserCell } from './Cells'

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
    title: 'User Tag Color',
    dataIndex: 'tagColor',
    key: 'tagColor',
    render: (value, row) => <UserColorTags value={value} row={row} />,
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
