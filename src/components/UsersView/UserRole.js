import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Dropdown, Menu } from 'antd';
import { updateSingleUserThunk } from '../../store/users';
import { DownOutlined } from '@ant-design/icons';

const roles = ['unconfirmed', 'admin', 'driver', 'detailer'];

const menuList = (fn) => {
  return (
    <Menu onClick={fn}>
      {roles.map((role, index) => (
        <Menu.Item key={role} id={index}>
          {role}
        </Menu.Item>
      ))}
    </Menu>
  );
};

const UserRole = ({ value, row }) => {
  const dispatch = useDispatch();

  const handleStatusUpdate = (e) => {
    dispatch(updateSingleUserThunk(row.id, { role: e.key }));
  };

  return (
    <div>
      <Dropdown overlay={() => menuList(handleStatusUpdate)}>
        <Button size="small" style={{ padding: '0px', width: '100%' }}>
          {value} <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
};

export default UserRole;
