import React from 'react'
import PropTypes from 'prop-types'
import {Input} from 'antd'
const {Search} = Input
import axios from 'axios'
import history from '../../history'

const propTypes = {}

const defaultProps = {}

const SearchBar = () => {
	const onSearch = async value => {
		let strValue = value.trim()
		let singleorder
		try {
			singleorder = await axios.get(`/api/orders/single/${strValue}`)
		} catch (e) {
			console.log('order not found', e)
		}

		if (singleorder.data) {
			console.log('order found', singleorder)
			await history.push(`/singleorder/${strValue}`)
		} else {
			window.alert('Order not found')
		}
	}

	return (
		<div>
			<Search
				placeholder='search for orders by order id ... '
				onSearch={onSearch}
				enterButton
			/>
		</div>
	)
}

SearchBar.propTypes = null
SearchBar.defaultProps = null

export default SearchBar
