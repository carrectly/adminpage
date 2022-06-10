import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveOrdersThunk } from '../../../store/activeOrders';
import { getUsersThunk } from '../../../store/users';
import DefaultTable from '../DefaultTable';
import InvoicesTable from '../InvoicesTable';
import CollapseByDate from '../CollapseByDate';
import CollapseTrips from '../CollapseTrips';
import SearchBar from '../../Shared/SearchBar';
import {
  getTakeActionStatusArray,
  getWorkZoneStatusArray,
  getInvoicesStatusArray,
  getQuotesStatusArray,
  getPotentialLeadsStatusArray,
  getConfirmedTripsArray,
} from '../../../utils';
import columns from '../../Table/HomeTableColumns';

import { Layout, Menu, Dropdown } from 'antd';
import {
  NotificationOutlined,
  ToolOutlined,
  DollarOutlined,
  PhoneOutlined,
  HourglassOutlined,
  MenuOutlined,
  CarOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Content } = Layout;

const employeeList = (arr, userLS, handleUserMenuClick) => {
  return (
    <Menu
      onClick={(e) => handleUserMenuClick(arr, e)}
      items={arr.map((person) => ({
        label: person.name ? person.name : person.firstName,
        key: person.id,
        icon: <UserOutlined />,
      }))}
    />
  );
};

const AdminMenu = () => {
  const dispatch = useDispatch();
  const [render, updateRender] = useState(1);
  const [activeUser, setActiveUser] = useState(
    localStorage.getItem('user') !== null ? localStorage.getItem('user') : 'user',
  );

  useEffect(() => {
    dispatch(getActiveOrdersThunk());
    dispatch(getUsersThunk());
  }, []);

  const handleMenuClick = (menu) => {
    updateRender(menu.key);
  };

  const handleUserMenuClick = (arr, e) => {
    localStorage.setItem('user', arr.filter((user) => user.id === +e.key)[0].firstName);
    setActiveUser(localStorage.getItem('user'));
  };

  const orders = useSelector((state) => state.activeOrders);
  const users = useSelector((state) => state.users);

  const actionStatusArr = getTakeActionStatusArray();
  const workZoneStatusArr = getWorkZoneStatusArray();
  const invoiceStatusArr = getInvoicesStatusArray();
  const quoteStatusArr = getQuotesStatusArray();
  const leadsStatusArr = getPotentialLeadsStatusArray();
  const confirmedTripsStatusArr = getConfirmedTripsArray();

  const memoizedOrderByUserArr = React.useMemo(() => {
    return orders
      .filter((el) => confirmedTripsStatusArr.includes(el.status))
      .filter((el) => {
        if (activeUser !== 'user' && el.customerRep !== null) {
          return el.customerRep.firstName === activeUser;
        }
        return null;
      });
  }, [orders, activeUser]);

  const actionArr = orders.filter((el) => actionStatusArr.includes(el.status));

  const workZoneArr = orders.filter((el) => workZoneStatusArr.includes(el.status));

  const invoiceArr = orders.filter((el) => invoiceStatusArr.includes(el.status));

  const quotesArr = orders.filter((el) => quoteStatusArr.includes(el.status));

  const leadsArr = orders.filter((el) => leadsStatusArr.includes(el.status));

  const confirmedTrips = orders.filter((el) => confirmedTripsStatusArr.includes(el.status));

  const components = {
    1: (
      <CollapseByDate
        orders={memoizedOrderByUserArr}
        dateColumn="pickupDate"
        columns={columns}
        emptyText={
          'You have no active orders assigned to you. Please, choose another user or assign order in section "To take action"'
        }
      />
    ),
    2: (
      <CollapseByDate
        orders={actionArr}
        dateColumn="pickupDate"
        columns={columns}
        emptyText={'No active orders'}
      />
    ),
    3: <DefaultTable ordersArray={workZoneArr} type="trips" />,
    4: <CollapseTrips orders={confirmedTrips} type="trips" />,
    5: <InvoicesTable ordersArray={invoiceArr} />,
    6: <DefaultTable ordersArray={quotesArr} type="default" />,
    7: <DefaultTable ordersArray={leadsArr} type="default" />,
  };

  return (
    <div>
      <SearchBar />
      <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
        <Menu
          mode="horizontal"
          defaultSelectedKeys="1"
          overflowedIndicator={<MenuOutlined />}
          defaultOpenKeys="1"
          onClick={handleMenuClick}
          style={{ height: '100%', padding: '0' }}
        >
          <Menu.Item key="1">
            Orders by{' '}
            <Dropdown.Button
              overlay={() => employeeList(users, activeUser, handleUserMenuClick)}
              placement="bottom"
              icon={<UserOutlined />}
            >
              {activeUser ? activeUser : 'user'}
            </Dropdown.Button>
          </Menu.Item>
          <Menu.Item key="2" icon={<NotificationOutlined />}>
            To take action
          </Menu.Item>
          <Menu.Item key="3" icon={<ToolOutlined />}>
            Garage
          </Menu.Item>
          <Menu.Item key="4" icon={<CarOutlined />}>
            Trips
          </Menu.Item>
          <Menu.Item key="5" icon={<DollarOutlined />}>
            Invoices
          </Menu.Item>
          <Menu.Item key="6" icon={<HourglassOutlined />}>
            Quotes
          </Menu.Item>
          <Menu.Item key="7" icon={<PhoneOutlined />}>
            Potential Leads
          </Menu.Item>
        </Menu>
        <Content style={{ padding: '0', minHeight: 280 }}>{components[render]}</Content>
      </Layout>
    </div>
  );
};

export default AdminMenu;
