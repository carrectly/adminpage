import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveOrdersThunk } from '../../../store/activeOrders';
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

import { Layout, Menu } from 'antd';
import {
  NotificationOutlined,
  ToolOutlined,
  DollarOutlined,
  PhoneOutlined,
  HourglassOutlined,
  MenuOutlined,
  CarOutlined,
} from '@ant-design/icons';
const { Content } = Layout;

const AdminMenu = () => {
  const dispatch = useDispatch();
  const [render, updateRender] = useState(1);

  useEffect(() => {
    dispatch(getActiveOrdersThunk());
  }, []);

  const handleMenuClick = (menu) => {
    updateRender(menu.key);
  };
  const orders = useSelector((state) => state.activeOrders);

  const actionStatusArr = getTakeActionStatusArray();
  const workZoneStatusArr = getWorkZoneStatusArray();
  const invoiceStatusArr = getInvoicesStatusArray();
  const quoteStatusArr = getQuotesStatusArray();
  const leadsStatusArr = getPotentialLeadsStatusArray();
  const confirmedTripsStatusArr = getConfirmedTripsArray();

  const actionArr = orders.filter((el) => actionStatusArr.includes(el.status));

  const workZoneArr = orders.filter((el) => workZoneStatusArr.includes(el.status));

  const invoiceArr = orders.filter((el) => invoiceStatusArr.includes(el.status));

  const quotesArr = orders.filter((el) => quoteStatusArr.includes(el.status));

  const leadsArr = orders.filter((el) => leadsStatusArr.includes(el.status));

  const confirmedTrips = orders.filter((el) => confirmedTripsStatusArr.includes(el.status));

  const components = {
    1: <CollapseByDate orders={actionArr} dateColumn="pickupDate" columns={columns} />,
    2: <DefaultTable ordersArray={workZoneArr} type="trips" />,
    3: <CollapseTrips orders={confirmedTrips} type="trips" />,
    4: <InvoicesTable ordersArray={invoiceArr} />,
    5: <DefaultTable ordersArray={quotesArr} type="default" />,
    6: <DefaultTable ordersArray={leadsArr} type="default" />,
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
          <Menu.Item key="1" icon={<NotificationOutlined />}>
            To take action
          </Menu.Item>
          <Menu.Item key="2" icon={<ToolOutlined />}>
            Garage
          </Menu.Item>
          <Menu.Item key="3" icon={<CarOutlined />}>
            Trips
          </Menu.Item>
          <Menu.Item key="4" icon={<DollarOutlined />}>
            Invoices
          </Menu.Item>
          <Menu.Item key="5" icon={<HourglassOutlined />}>
            Quotes
          </Menu.Item>
          <Menu.Item key="6" icon={<PhoneOutlined />}>
            Potential Leads
          </Menu.Item>
        </Menu>
        <Content style={{ padding: '0', minHeight: 280 }}>{components[render]}</Content>
      </Layout>
    </div>
  );
};

export default AdminMenu;
