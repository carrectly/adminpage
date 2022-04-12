import React, { useState, useEffect } from 'react';
import { fetchServicesThunk as getServices } from '../../store/services';
import { addOrderServiceThunk as addService } from '../../store/singleorder';
import { Select, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

const { Option } = Select;

const AddOrderServices = ({ orderid }) => {
  const [serviceId, setServiceId] = useState(null);
  const services = useSelector((state) => state.services) || [];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getServices());
  }, []);

  const handleAddService = () => {
    dispatch(addService(orderid, serviceId));
    setServiceId(null);
  };

  const handleChange = (value) => {
    setServiceId(value);
  };

  return (
    <div className="select-and-button">
      <Select
        showSearch
        style={{ width: '80%' }}
        placeholder="Search to add service"
        optionFilterProp="children"
        onChange={(e) => handleChange(e)}
      >
        {services.map((svc) => (
          <Option value={svc.id} key={svc.id} name={svc.name} id={svc.id}>
            {svc.name}
          </Option>
        ))}
      </Select>
      <Button
        style={{ backgroundColor: '#6AEB6F' }}
        size="middle"
        shape="default"
        disabled={!serviceId}
        onClick={handleAddService}
      >
        Add
      </Button>
    </div>
  );
};

export default AddOrderServices;
