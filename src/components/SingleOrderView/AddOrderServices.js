import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchServicesThunk } from '../../store/services'
import { addOrderServiceThunk } from '../../store/singleorder'
import { Select, Button } from 'antd'

const { Option } = Select

const AddOrderServices = (props) => {
  const [service, setService] = useState(null)

  useEffect(() => {
    props.getServices()
  }, [])

  const handleAddService = () => {
    let id = props.orderid
    props.addService(id, service)
    setService(null)
  }

  const handleChange = (value) => {
    console.log('setting value', value)
    setService(value)
  }

  const servicesDropDown = props.services || []
  return (
    <div className="select-and-button">
      <Select
        showSearch
        style={{ width: '80%' }}
        placeholder="Search to add service"
        optionFilterProp="children"
        onChange={(e) => handleChange(e)}
        filterOption={(input, option) =>
          option.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        filterSort={(optionA, optionB) =>
          optionA.toLowerCase().localeCompare(optionB.toLowerCase())
        }
      >
        {servicesDropDown.map((svc) => (
          <Option value={svc.name} key={svc.id} name={svc.name} id={svc.id}>
            {svc.name}
          </Option>
        ))}
      </Select>
      <Button
        style={{ backgroundColor: '#6AEB6F' }}
        size="middle"
        shape="round"
        disabled={!service}
        onClick={handleAddService}
      >
        Add
      </Button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    services: state.services,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getServices: () => dispatch(fetchServicesThunk()),
    addService: (id, obj) => dispatch(addOrderServiceThunk(id, obj)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddOrderServices)
