import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {Modal, Button, Form, Input, InputNumber, Dropdown, Menu} from 'antd'
import {updateServiceThunk} from '../../store/services'

const roles = ['unconfirmed', 'admin', 'driver', 'cosmetics']

const menuList = fn => {
	return (
		<Menu onClick={fn}>
			{roles.map((status, index) => (
				<Menu.Item key={status} id={index}>
					{status}
				</Menu.Item>
			))}
		</Menu>
	)
}

const UserRole = ({value, row}) => {
	const handleStatusUpdate = e => {}
	return (
		<div>
			<Dropdown overlay={() => menuList(handleStatusUpdate)}>
				<Button size='small' style={{padding: '0px'}}>
					{value}
				</Button>
			</Dropdown>
		</div>
	)
}

export default UserRole
