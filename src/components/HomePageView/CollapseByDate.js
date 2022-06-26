import React from 'react';
import DefaultTable from './DefaultTable';
import { Collapse, Empty } from 'antd';
const { Panel } = Collapse;
import moment from 'moment';
import { panelHeaderHelper } from '../Shared/CollapsePanelHelper';

const CollapseByDate = ({ dateColumn, orders = [], columns = [], emptyText = '' }) => {
  const hashTable = {};
  let groupedArr;

  if (orders.length) {
    orders.forEach((element) => {
      let date = moment(element[dateColumn]).format('M/D/YY');
      if (hashTable.hasOwnProperty(date)) {
        hashTable[date].push(element);
      } else {
        hashTable[date] = [element];
      }
    });
    groupedArr = Object.entries(hashTable);
    groupedArr = groupedArr.sort((a, b) => new Date(a[0]) - new Date(b[0]));
  } else {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '40px',
        }}
      >
        <Empty description={<div style={{ maxWidth: '300px' }}>{emptyText}</div>} />
      </div>
    );
  }

  return (
    <Collapse defaultActiveKey={['0']}>
      {groupedArr.map((el, index) => (
        <Panel key={index} header={panelHeaderHelper(el[0], el[1])}>
          <DefaultTable ordersArray={el[1]} columns={columns} />
        </Panel>
      ))}
    </Collapse>
  );
};

export default CollapseByDate;
