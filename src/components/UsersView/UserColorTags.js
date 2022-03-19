import React from 'react'
import { useDispatch } from 'react-redux'
import { Button, Dropdown, Menu } from 'antd'
import { updateSingleUserThunk } from '../../store/users'
import { DownOutlined } from '@ant-design/icons'
import { tagColorsArray } from '../util'
const colors = tagColorsArray()

const menuList = (fn) => {
  return (
    <Menu onClick={fn} style={{ maxHeight: '500px', overflow: 'scroll' }}>
      {colors.map((color, index) => (
        <Menu.Item
          key={color}
          id={index}
          style={{ backgroundColor: `${color}` }}
        >
          {color}
        </Menu.Item>
      ))}
    </Menu>
  )
}

const SelectUserTag = ({ value, row }) => {
  const dispatch = useDispatch()

  const handleStatusUpdate = (e) => {
    console.log('trying to dispatch', e)
    dispatch(updateSingleUserThunk(row.id, { tagColor: e.key }))
  }

  return (
    <Dropdown overlay={() => menuList(handleStatusUpdate)}>
      <Button
        size="small"
        style={{ backgroundColor: value, padding: '0px', width: '100%' }}
      >
        {value} <DownOutlined />
      </Button>
    </Dropdown>
  )
}

export default SelectUserTag
