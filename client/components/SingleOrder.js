import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getSingleOrderThunk} from '../store/singleorder'

class SingleOrder extends Component {
	componentDidMount() {
		console.log('props params', this.props.match.params)
		this.props.getOrder(this.props.match.params.orderid)
	}

	render() {
		const singleorder = this.props.order || {}
		let arr = []
		for (let [key, value] of Object.entries(singleorder)) {
			arr.push(`${key}: ${value}`)
		}
		return (
			<div>
				<h3>Order Details</h3>
				<table>
					<tbody>
						{arr.map((details, index) => (
							<tr key={index}>
								<th>{details.split(':')[0]}</th>
								<td>{details.split(':')[1]}</td>
							</tr>
						))}
					</tbody>
				</table>

				<h3>Order Email History</h3>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		order: state.singleorder,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getOrder: id => dispatch(getSingleOrderThunk(id)),
	}
}
export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(SingleOrder)
)
