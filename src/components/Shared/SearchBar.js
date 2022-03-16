import React from 'react'

import { Input } from 'antd'
const { Search } = Input
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
  const navigate = useNavigate()

  const onSearch = async (value) => {
    let strValue = value.trim()
    let singleorder
    try {
      singleorder = await axios.get(`/api/orders/single/${strValue}`)
    } catch (e) {
      console.log('order not found', e)
    }

    if (singleorder.data) {
      console.log('order found', singleorder)
      navigate(`/singleorder/${strValue}`)
    } else {
      window.alert('Order not found')
    }
  }

  return (
    <div>
      <Search
        placeholder="search for orders by order id ... "
        onSearch={onSearch}
        enterButton
      />
    </div>
  )
}

export default SearchBar
