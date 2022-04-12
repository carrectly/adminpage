import React from 'react';
import AdminMenu from './HomePageView/Admin/AdminMenu';
import TableByDriver from './HomePageView/Driver/TableByDriver';
import TableByDetailer from './HomePageView/Detailer/TableByDetailer';
import { useSelector } from 'react-redux';

const Account = () => {
  const user = useSelector((state) => state.user);
  if (user.id) {
    if (user.role === 'unconfirmed') {
      return <div>Welcome. Your account needs to be appoved by the admin!</div>;
    } else if (user.role === 'driver') {
      return <TableByDriver email={user.email} />;
    } else if (user.role === 'detailer') {
      return <TableByDetailer />;
    } else {
      return <AdminMenu />;
    }
  } else {
    return null;
  }
};

export default Account;
