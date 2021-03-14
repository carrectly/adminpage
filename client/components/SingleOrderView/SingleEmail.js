import React, {Component} from 'react'
import {useSelector} from 'react-redux'
import renderHTML from 'react-render-html'

const SingleEmail = () => {
	const message = useSelector(state => state.singleemail)

	if (message.length) {
		return <div>{renderHTML(message)}</div>
	} else {
		return <div>Click on the inbox subject to preview</div>
	}
}

export default SingleEmail
