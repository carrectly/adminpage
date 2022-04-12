import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleOrderThunk } from '../../store/singleorder';
import { getUsersThunk } from '../../store/users';
import Invoice from './Invoice';
import OrderComments from './OrderComments';
import SingleOrderDetails from './SingleOrderDetails';
import SingleOrderEmails from './SingleOrderEmails';
import SingleOrderServices from './SingleOrderServices';
import './styles.scss';

const SingleOrder = () => {
  const { orderid } = useParams();
  const order = useSelector((state) => state.singleorder);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleOrderThunk(orderid));
    dispatch(getUsersThunk());
  }, []);

  const singleorder = order || {};
  const services = order.services || [];
  const customer = singleorder.customer || {};
  const pickUpDriver = singleorder.pickUpDriver || {};
  const returnDriver = singleorder.returnDriver || {};
  const customerRep = singleorder.customerRep || {};
  const orderDealers = singleorder.dealers || [];

  return (
    <div>
      <div className="singleordercontainer">
        <div className="singleordertable">
          <SingleOrderDetails
            order={singleorder}
            customer={customer}
            pickUpDriver={pickUpDriver}
            returnDriver={returnDriver}
            orderDealers={orderDealers}
            customerRep={customerRep}
          />
          <SingleOrderEmails />
        </div>
        <div className="invoiceform">
          <h3 className="sectionHeader">Manage Order</h3>
          <Invoice />
          <h3 className="sectionHeader">Add Services</h3>
          <div className="singleOrderServices">
            <SingleOrderServices services={services} />
          </div>
          <h3 className="sectionHeader">Internal Comments</h3>
          <OrderComments id={orderid} />
        </div>
      </div>
      <br />
    </div>
  );
};

export default SingleOrder;
