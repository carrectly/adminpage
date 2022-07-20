import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Descriptions, Tabs, Button, Dropdown, Menu, Select } from 'antd';
import { Link, useParams } from 'react-router-dom';
const { TabPane } = Tabs;
import moment from 'moment';
import { LocationCell, StatusCell, ConciergeCell, GoogleVoiceLinkCell } from '../Table/Cells.js';
import { getStatusArray } from '../../utils';
import {
  updateSingleOrderThunk as updateOrder,
  addOrderDriverThunk as addOrderDriver,
  addOrderDealerThunk as addOrderDealer,
  removeOrderDealerThunk as removeOrderDealer,
  addOrderCustomerRepThunk as addOrderCustomerRep,
} from '../../store/singleorder';
import { UserOutlined } from '@ant-design/icons';
import './styles.scss';

const statusArray = getStatusArray();
const { Option } = Select;

const menuList = (fn) => (
  <Menu onClick={fn}>
    {statusArray.map((status, index) => (
      <Menu.Item key={status} id={index}>
        {status}
      </Menu.Item>
    ))}
  </Menu>
);

const employeeList = (arr, fn, tripType) => (
  <Menu onClick={fn}>
    {arr.map((person) => (
      <Menu.Item key={person.id} id={tripType}>
        {person.name ? person.name : person.firstName}
      </Menu.Item>
    ))}
  </Menu>
);

const flattenDealersArray1 = (allShopsArray, shopsAlreadySelected) => {
  const idsSelected = shopsAlreadySelected.map((el) => el.id);
  const difference = allShopsArray.filter((element) => !idsSelected.includes(element.id));
  return difference.map((el) => (
    <Option value={el.id} key={el.id}>
      {el.name}
    </Option>
  ));
};

// const flattenDealersArray2 = (arr) =>
//   arr.map((el) => ({ key: el.id, value: el.id, label: el.name }));

const flattenDealersArray2 = (arr) =>
  arr.map((el) => (
    <div value={el.id} key={el.id}>
      {el.name}
    </div>
  ));

const SingleOrderDetails = ({
  order,
  pickUpDriver,
  customerRep,
  returnDriver,
  customer,
  orderDealers,
}) => {
  const dispatch = useDispatch();
  const { orderid } = useParams();
  const drivers = useSelector((state) => state.drivers);
  const users = useSelector((state) => state.users);
  const allShops = useSelector((state) => state.dealers);

  const handleStatusUpdate = (e) => {
    let obj = {
      status: e.key,
    };
    if (e.key === 'cancelled') {
      if (
        window.confirm(
          'Changing the status to cancelled will remove the order from the home page and will move it to archives. Do you want to proceed?',
        )
      ) {
        dispatch(updateOrder(orderid, obj));
      } else {
        console.log('changed my mind');
      }
    } else if (e.key === 'paid') {
      if (
        window.confirm(
          'Changing the status to paid will remove the order from the home page and will move it to archives. Do you want to proceed?',
        )
      ) {
        dispatch(updateOrder(orderid, obj));
      } else {
        console.log('changed my mind');
      }
    } else if (e.key === 'confirmed') {
      const diff = moment(order.dropoffDate).diff(moment(order.pickupDate));
      if (diff < 0 || !diff) {
        window.alert(
          'Please enter a valid drop off date before marking the order as confirmed. Drop off date must be after pick up date',
        );
      } else {
        dispatch(updateOrder(orderid, obj));
      }
    } else {
      dispatch(updateOrder(orderid, obj));
    }
  };

  const handleAddDealer = (dealerId) => {
    dispatch(addOrderDealer(orderid, dealerId));
  };

  const handleRemoveDealer = (evt) => {
    dispatch(removeOrderDealer(orderid, evt));
  };

  const changeDriver = (evt) => {
    dispatch(
      addOrderDriver(orderid, {
        driverId: evt.key,
        tripType: evt.item.props.id,
      }),
    );
  };

  const assignCustomerRep = (evt) => {
    dispatch(addOrderCustomerRep(orderid, evt.key));
  };

  let additionalComments;
  let services;
  if (Object.keys(order).length > 0 && order.customerComments.indexOf('services list') > -1) {
    const [comments, userServices, ...others] = order.customerComments.split('services list:');
    additionalComments = comments;
    if (userServices.includes('\\')) {
      services = JSON.parse(userServices.replace(/\\/g, ''));
    } else {
      services = userServices.replace(/\n/g, ', ');
    }
  } else {
    additionalComments = order.customerComments;
  }

  return (
    <Tabs type="card" style={{ margin: '0px 0px 10px 0px' }}>
      <TabPane tab="Order Details" key="1">
        <Descriptions
          className="order-descriptions"
          layout="vertical"
          column={{
            xxl: 3,
            xl: 2,
            lg: 2,
            md: 2,
            sm: 1,
            xs: 1,
          }}
        >
          <Descriptions.Item>
            <Descriptions
              title="Order"
              layout="horizontal"
              bordered={false}
              column={1}
              size="small"
            >
              <Descriptions.Item label="Order ID">{order.hash}</Descriptions.Item>
              <Descriptions.Item label="Status">
                <Dropdown overlay={() => menuList(handleStatusUpdate)}>
                  <Button size="small" style={{ padding: '0px' }}>
                    <StatusCell value={order.status} dropDown={true} />
                  </Button>
                </Dropdown>
              </Descriptions.Item>
              <Descriptions.Item label="Pickup Date">
                {moment(order.pickupDate).format('M/D/YY hh:mm A')}
              </Descriptions.Item>
              <Descriptions.Item label="Drop Off Date">
                {moment(order.dropoffDate).format('M/D/YY hh:mm A')}
              </Descriptions.Item>
              <Descriptions.Item label="Pickup Location">
                <LocationCell value={order.pickupLocation} />
              </Descriptions.Item>
              <Descriptions.Item label="DropOff Location">
                <LocationCell
                  value={order.dropoffLocation ? order.dropoffLocation : order.pickupLocation}
                />
              </Descriptions.Item>
              <Descriptions.Item label="PROMO CODE">{order.promoCode}</Descriptions.Item>
              <Descriptions.Item label="Discount">{order.discount}</Descriptions.Item>
              <Descriptions.Item label="Flexible on Time">{order.flexibleOnTime}</Descriptions.Item>
              <Descriptions.Item label="Created at">
                {moment(order.createdAt).format('M/D/YY hh:mm A')}
              </Descriptions.Item>
              <Descriptions.Item label="Updated at">
                {moment(order.updatedAt).format('M/D/YY hh:mm A')}
              </Descriptions.Item>
            </Descriptions>
          </Descriptions.Item>

          <Descriptions.Item>
            <Descriptions
              title="Car"
              layout="horizontal"
              bordered={false}
              size="small"
              column={1}
              className="descriptionsAntd"
            >
              <Descriptions.Item label="Car Make">{order.carMake}</Descriptions.Item>
              <Descriptions.Item label="Car Model">{order.carModel}</Descriptions.Item>
              <Descriptions.Item label="Car Year">{order.carYear}</Descriptions.Item>
              <Descriptions.Item label="Car Color">{order.carColor}</Descriptions.Item>
              <Descriptions.Item label="VIN">{order.vin}</Descriptions.Item>
              <Descriptions.Item label="Stick shift">{order.stickShift}</Descriptions.Item>
            </Descriptions>
          </Descriptions.Item>

          <Descriptions.Item>
            <Descriptions
              title="Customer"
              layout="horizontal"
              bordered={false}
              size="small"
              column={1}
              className="descriptionsAntd"
            >
              <Descriptions.Item label="Customer Phone Number">
                <GoogleVoiceLinkCell value={customer.phoneNumber} />
              </Descriptions.Item>
              <Descriptions.Item label="Customer Name">
                <Link to={`/singlecustomer/${customer.phoneNumber}`}>
                  {customer.firstName} {customer.lastName}
                </Link>
              </Descriptions.Item>
              <Descriptions.Item label="Customer Comments" contentStyle={{ display: 'block' }}>
                <div>{additionalComments}</div>
                {services && services.length > 0 && (
                  <div>
                    <b>Services list: </b>
                    {typeof services === 'string'
                      ? services
                      : services.map((service) => service.name).join(', ')}
                  </div>
                )}
              </Descriptions.Item>
            </Descriptions>
          </Descriptions.Item>

          <Descriptions.Item>
            <Descriptions
              title="Driver"
              layout="horizontal"
              bordered={false}
              size="small"
              column={1}
              className="descriptionsAntd"
            >
              <Descriptions.Item label="Shops servicing">
                <Select
                  mode="multiple"
                  allowClear={false}
                  style={{ width: '50%' }}
                  placeholder="Please select"
                  onSelect={handleAddDealer}
                  onDeselect={handleRemoveDealer}
                  value={flattenDealersArray2(orderDealers)}
                >
                  {flattenDealersArray1(allShops, orderDealers)}
                </Select>
              </Descriptions.Item>
              <Descriptions.Item label="Concierge">
                <div>{order.concierge}</div>
              </Descriptions.Item>
              <Descriptions.Item label="Driver picking up">
                <Dropdown overlay={() => employeeList(drivers, changeDriver, 'pickUp')}>
                  <Button size="small" style={{ padding: '0px', border: '0px' }}>
                    <ConciergeCell value={pickUpDriver} dropDown={true} />
                  </Button>
                </Dropdown>
              </Descriptions.Item>
              <Descriptions.Item label="Driver dropping off">
                {moment(order.dropoffDate).diff(moment(order.pickupDate)) > 0 ? (
                  <Dropdown overlay={() => employeeList(drivers, changeDriver, 'return')}>
                    <Button
                      size="small"
                      style={{
                        padding: '0px',
                        border: '0px',
                      }}
                    >
                      <ConciergeCell value={returnDriver} dropDown={true} />
                    </Button>
                  </Dropdown>
                ) : (
                  <div>Please enter a valid drop off date in order to assign a driver</div>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Customer Rep in charge of the order">
                <Dropdown overlay={() => employeeList(users, assignCustomerRep, '')}>
                  <Button size="small" style={{ padding: '0px', border: '0px' }}>
                    <ConciergeCell value={customerRep} dropDown={true} />
                  </Button>
                </Dropdown>
              </Descriptions.Item>
            </Descriptions>
          </Descriptions.Item>
        </Descriptions>
      </TabPane>
      <TabPane tab="Change log" key="2">
        Change log coming soon ...
      </TabPane>
    </Tabs>
  );
};

export default SingleOrderDetails;
