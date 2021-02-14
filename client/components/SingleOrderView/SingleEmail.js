import React, {Component} from 'react'
import renderHTML from 'react-render-html'

class SingleEmail extends Component {
	render() {
		let message = 'Nothing to Preview'
		if (this.props.single.length) {
			message = this.props.single
		}
		return <div>{renderHTML(message)}</div>
	}
}

export default SingleEmail
