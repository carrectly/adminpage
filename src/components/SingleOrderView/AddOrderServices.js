import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchServicesThunk } from '../../store/services'
import { addOrderServiceThunk } from '../../store/singleorder'
import { Select, Button } from 'antd'

const { Option } = Select

const AddOrderServices = (props) => {
  const [serviceId, setServiceId] = useState(null)

  useEffect(() => {
    props.getServices()
  }, [])

  const handleAddService = () => {
    let id = props.orderid
    props.addService(id, serviceId)
    setServiceId(null)
  }

  const handleChange = (value) => {
    setServiceId(value)
  }

  const servicesDropDown = props.services || []
  return (
    <div className="select-and-button">
      <Select
        showSearch={false}
        style={{ width: '80%' }}
        placeholder="Search to add service"
        optionFilterProp="children"
        onChange={(e) => handleChange(e)}
        filterOption={(input, option) => option.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        {servicesDropDown.map((svc) => (
          <Option value={svc.id} key={svc.id} name={svc.name} id={svc.id}>
            {svc.name}
          </Option>
        ))}
      </Select>
      <Button style={{ backgroundColor: '#6AEB6F' }} size="middle" shape="round" disabled={!serviceId} onClick={handleAddService}>
        Add
      </Button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    services: state.services
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getServices: () => dispatch(fetchServicesThunk()),
    addService: (id, obj) => dispatch(addOrderServiceThunk(id, obj))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddOrderServices)
