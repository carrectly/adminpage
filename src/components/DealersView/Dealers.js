import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Popover } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDealersThunk, removeDealerThunk } from '../../store/dealers.js';
import AddDealer from './AddDealer.js';
import DealerCard from './DealerCard';

const Dealers = () => {
  const [show, setShow] = useState(false);
  const dealers = useSelector((state) => state.dealers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDealersThunk());
  }, []);

  return (
    <div>
      <div>
        {dealers.length ? (
          <div>
            <div className="alldealersview">
              {dealers.map((dlr) => (
                <div key={dlr.id} className="dealerCard">
                  <DealerCard
                    key={dlr.id}
                    dealer={dlr}
                    delete={(id) => dispatch(removeDealerThunk(id))}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <h1>No dealers Found</h1>
        )}
      </div>
      <div>
        <Popover content="Click here to add a dealer">
          <FontAwesomeIcon
            className="float-plus"
            onClick={() => setShow(true)}
            icon={faPlusCircle}
          />
        </Popover>
        <AddDealer show={show} onHide={() => setShow(false)} />
      </div>
    </div>
  );
};

export default Dealers;
