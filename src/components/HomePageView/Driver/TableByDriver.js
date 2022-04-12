import React, { useEffect } from 'react';
import { Table, Collapse, Spin } from 'antd';
import columns from '../../Table/HomeTableForDriversColumns';
import { useSelector, useDispatch } from 'react-redux';
import { getUserOrdersThunk } from '../../../store/userorders';
const { Panel } = Collapse;
import moment from 'moment';
import { panelHeaderHelper } from '../../Shared/CollapsePanelHelper';

const pickUpArray = [
  'booked new',
  'booked us',
  'followed up - text',
  'followed up - call',
  'followed up - email',
  'confirmed',
];

const TableByDriver = ({ email }) => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.userorders);
  const hashTable = {};
  let groupedArr;

  useEffect(() => {
    dispatch(getUserOrdersThunk(email));
  }, []);

  if (orders.length) {
    orders.forEach((element) => {
      if (pickUpArray.includes(element.status)) {
        let date = moment(element.pickupDate).format('M/D/YY');
        if (hashTable.hasOwnProperty(date)) {
          hashTable[date].push(element);
        } else {
          hashTable[date] = [element];
        }
      } else {
        let date = moment(element.dropoffDate).format('M/D/YY');
        if (hashTable.hasOwnProperty(date)) {
          hashTable[date].push(element);
        } else {
          hashTable[date] = [element];
        }
      }
    });
    groupedArr = Object.entries(hashTable);
    groupedArr = groupedArr.sort((a, b) => moment(a[0]).diff(moment(b[0])));
  } else {
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
    <Collapse>
      {groupedArr.map((el, index) => (
        <Panel key={index} header={panelHeaderHelper(el[0], el[1])}>
          <Table
            scroll={{ x: 'max-content' }}
            columns={columns}
            dataSource={el[1]}
            pagination={false}
            size="small"
            rowKey="hash"
          />
        </Panel>
      ))}
    </Collapse>
  );
};

export default TableByDriver;
