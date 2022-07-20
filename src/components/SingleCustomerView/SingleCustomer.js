import { Card, Table, Space } from 'antd';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getCustomerOrdersThunk as getOrders } from '../../store/customerorders';
import { getSingleCustomerThunk as getCustomer } from '../../store/singlecustomer';
import UpdateCustomer from './UpdateCustomer';
import { Spin } from 'antd';

const columns = [
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Pickup Date',
    dataIndex: 'pickupDate',
    key: 'pickupDate',
    render: (pickupDate) => new Date(pickupDate).toUTCString(),
  },
  {
    title: 'Dropoff Date',
    dataIndex: 'dropoffDate',
    key: 'dropoffDate',
    render: (dropoffDate) => new Date(dropoffDate).toUTCString(),
  },
  {
    title: 'Pickup Location',
    dataIndex: 'pickupLocation',
    key: 'pickupLocation',
  },
  {
    title: 'Drop-off Location',
    dataIndex: 'dropoffLocation',
    key: 'dropoffLocation',
  },
  {
    title: 'Car Make',
    dataIndex: 'carMake',
    key: 'carMake',
  },
  {
    title: 'Car Model',
    dataIndex: 'carModel',
    key: 'carModel',
  },
  {
    title: 'Car Year',
    dataIndex: 'carYear',
    key: 'carYear',
  },
  {
    title: 'Order Details',
    dataIndex: '',
    key: '',
    render: (_, ord) => (
      <Space size="middle">
        <Link to={`/singleorder/${ord.hash}`} id={ord.hash}>
          View
        </Link>
      </Space>
    ),
  },
];

const SingleCustomer = () => {
  const { userid } = useParams();
  const orders = useSelector((state) => state.customerorders) || [];
  const customer = useSelector((state) => state.singlecustomer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCustomer(userid));
    dispatch(getOrders(userid));
  }, []);

  if (Object.keys(customer).length === 0) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Spin />
      </div>
    );
  }

  return (
    <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', width: '100%' }}>
      <div className="customercontainer">
        <div className="customerinfo">
          <h2>Customer Info</h2>
          <Card
            className="clientcard"
            title={`${customer.firstName} ${customer.lastName}`}
            style={{ minHeight: '300px' }}
          >
            <table>
              <tbody>
                <tr>
                  <td width={150}>First Name:</td>
                  <td>{customer.firstName}</td>
                </tr>
                <tr>
                  <td width={150}>Last Name:</td>
                  <td>{customer.lastName}</td>
                </tr>
                <tr>
                  <td width={150}>Email:</td>
                  <td>{customer.email}</td>
                </tr>
                <tr>
                  <td>Phone Number:</td>
                  <td>{customer.phoneNumber}</td>
                </tr>
                <tr>
                  <td>Location:</td>
                  <td>{customer.location}</td>
                </tr>
                <tr>
                  <td>Created on:</td>
                  <td>{moment(customer.createdAt).format('M/D/YY hh:mm A')}</td>
                </tr>
                <tr>
                  <td>Updated on:</td>
                  <td>{moment(customer.updatedAt).format('M/D/YY hh:mm A')}</td>
                </tr>
              </tbody>
            </table>
          </Card>
        </div>
        <div className="customerupdate">
          <h2>Update Customer Info</h2>
          <UpdateCustomer customer={customer} />
        </div>
      </div>
      <h2>Order History</h2>
      <Table dataSource={orders} columns={columns} pagination={{ position: ['bottomCenter'] }} />
    </div>
  );
};

export default SingleCustomer;
