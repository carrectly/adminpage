import React, { useEffect } from 'react';
import CollapseTrips from '../HomePageView/CollapseTrips';
import { useDispatch, useSelector } from 'react-redux';
import { getConfirmedTripsArray } from '../../utils';
import { getActiveOrdersThunk } from '../../store/activeOrders';

const confirmedTripsStatusArr = getConfirmedTripsArray();

const AllTripsView = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getActiveOrdersThunk());
  }, []);

  const orders = useSelector((state) => state.activeOrders);

  const confirmedTrips = orders.filter((el) => confirmedTripsStatusArr.includes(el.status));

  return <CollapseTrips orders={confirmedTrips} />;
};

export default AllTripsView;
