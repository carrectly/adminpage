import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Popover } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDriversThunk as fetchDrivers,
  removeDriverThunk as removeDriver,
} from '../../store/drivers.js';
import AddDriver from './AddDriver.js';
import DriverCard from './DriverCard';

const Drivers = () => {
  const [show, setShow] = useState(false);
  const drivers = useSelector((state) => state.drivers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDrivers());
  }, []);

  return (
    <div>
      <div>
        {drivers.length ? (
          <div>
            <div className="alldealersview">
              {drivers.map((dlr) => (
                <div key={dlr.id} className="dealerCard">
                  <DriverCard
                    key={dlr.id}
                    driver={dlr}
                    delete={(id) => dispatch(removeDriver(id))}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <h1>No drivers found</h1>
        )}
      </div>
      <div>
        <Popover content="Click here to add a new driver">
          <FontAwesomeIcon
            className="float-plus"
            onClick={() => setShow(true)}
            icon={faPlusCircle}
          />
        </Popover>
        <AddDriver show={show} onHide={() => setShow(false)} />
      </div>
    </div>
  );
};

export default Drivers;
