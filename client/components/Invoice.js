import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getCustomerThunk, createInvoiceThunk} from '../store/stripe'
import InvoiceForm from './InvoiceForm'

let cust

class Invoice extends Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
		this.state = {
			invoice: true,
		}
	}
	componentDidUpdate() {
		cust = this.props.customer.id
	}

	handleClick(obj) {
		this.props.getCustomer(obj)
		this.setState({
			invoice: false,
		})
	}

	render() {
		cust = this.props.customer.id || null

		return (
			<div>
				<button
					type='button'
					onClick={() => this.handleClick(this.props.order)}>
					Check if customer exists in Stripe
				</button>
				<button
					type='button'
					disabled={this.state.invoice}
					onClick={() =>
						this.props.createInvoice(
							this.props.order,
							this.props.customer.id
						)
					}>
					Create Invoice
				</button>
				<InvoiceForm />
				<div>
					{cust ? <div>{this.props.customer.status}</div> : <div />}
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		customer: state.stripe.singleCustomer,
		order: state.singleorder,
	}
}
const mapDispatchToProps = dispatch => {
	return {
		getCustomer: obj => dispatch(getCustomerThunk(obj)),
		createInvoice: (obj, str) => dispatch(createInvoiceThunk(obj, str)),
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Invoice))
