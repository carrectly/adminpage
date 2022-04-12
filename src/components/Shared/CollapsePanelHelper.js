import React from 'react';
import moment from 'moment';
import { Alert } from 'antd';

export const panelHeaderHelper = (date, ordersForDate) => {
  if (date === 'Invalid date')
    return (
      <Alert message="Invalid dates. Please update order drop off dates" type="error" showIcon />
    );
  if (moment(new Date(date)).isSame(moment(), 'day'))
    return <Alert message="Today's cars" type="warning" showIcon />;
  if (moment(new Date(date)).isSame(moment().add(1, 'days'), 'day'))
    return <Alert message="Tomorrow's cars" type="info" showIcon />;
  if (moment(new Date(date)).isBefore(moment()))
    return (
      <Alert
        message="Trip dates are in the past. Please update order dates"
        type="error"
        showIcon
      />
    );
  return `Trip date ${moment(date).format('M/D/YY')}  count ${ordersForDate.length}`;
};
