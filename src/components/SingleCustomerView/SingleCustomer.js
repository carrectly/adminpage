import { Card } from 'antd';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getCustomerOrdersThunk as getOrders } from '../../store/customerorders';
import { getSingleCustomerThunk as getCustomer } from '../../store/singlecustomer';
import UpdateCustomer from './UpdateCustomer';

const SingleCustomer = () => {
  const { userid } = useParams();
  const orders = useSelector((state) => state.customerorders) || [];
  const customer = useSelector((state) => state.singlecustomer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCustomer(userid));
    dispatch(getOrders(userid));
  }, []);

  return (
    <div>
      <div className="customercontainer">
        <div className="customerinfo">
          <Card className="clientcard" title={`${customer.firstName} ${customer.lastName}`}>
            <div>{customer.email}</div>
            <div>{customer.location}</div>
            <div>{customer.phoneNumber}</div>
            <div>{customer.location}</div>
            <div>
              <span>Created on </span>
              {moment(customer.createdAt).format('M/D/YY hh:mm A')}
            </div>
            <div>
              <span>Updated on </span>
              {moment(customer.updatedAt).format('M/D/YY hh:mm A')}
            </div>
          </Card>
        </div>
        <div className="customerupdate">
          <UpdateCustomer />
        </div>
      </div>
      <h3>Order History</h3>
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Pickup Date</th>
            <th>Dropoff Date</th>
            <th>Pickup Location</th>
            <th>Car Make</th>
            <th>Car Model</th>
            <th>Car Year</th>
            <th>Order Details</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((ord) => (
              <tr key={ord.hash}>
                <td>{ord.status}</td>
                <td>{new Date(ord.pickupDate).toUTCString()}</td>
                <td>{new Date(ord.dropoffDate).toUTCString()}</td>
                <td>{ord.pickupLocation}</td>
                <td>{ord.carMake}</td>
                <td>{ord.carModel}</td>
                <td>{ord.carYear}</td>
                <td>
                  <Link to={`/singleorder/${ord.hash}`} id={ord.hash}>
                    View
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default SingleCustomer;
