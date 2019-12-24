import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getCustomerThunk, createInvoiceThunk} from '../store/stripe'
import InvoiceForm from './InvoiceForm'

let cust

class Invoice extends Component {
	componentDidUpdate() {
		cust = this.props.customer.id
	}
	render() {
		cust = this.props.customer.id || null

		return (
			<div>
				<button
					type='button'
					onClick={() => this.props.getCustomer(this.props.order)}>
					Check if customer exists in Square
				</button>
				<button
					type='button'
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
					{cust ? <div>Customer Created in Stripe</div> : <div />}
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
