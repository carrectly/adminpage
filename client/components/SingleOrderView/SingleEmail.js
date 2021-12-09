import React, {Component} from 'react'
import {useSelector} from 'react-redux'


const SingleEmail = () => {
	const message = useSelector(state => state.singleemail)

	if (message.length) {
		// return <div>{renderHTML(message)}</div>
    return <div></div>
	} else {
		return <div>Click on the inbox subject to preview</div>
	}
}

export default SingleEmail
