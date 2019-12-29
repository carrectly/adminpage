import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getCustomerThunk, createInvoiceThunk} from '../store/stripe'
import {DropdownButton, Dropdown, Button} from 'react-bootstrap'

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
				<p>Can't create an invoice until the status is "completed" </p>
				<p>
					Can't create an invoice until we check if the user exists in
					stripe
				</p>

				<DropdownButton
					size='lg'
					id='dropdown-basic-button'
					title='Change Status'
					className='btn-block'>
					<Dropdown.Item href='#/action-1'>Received</Dropdown.Item>
					<Dropdown.Item href='#/action-2'>
						Waiting on Quote
					</Dropdown.Item>
					<Dropdown.Item href='#/action-3'>
						Quote Approved - getting Serviced
					</Dropdown.Item>
					<Dropdown.Item href='#/action-4'>
						Completed - pending invoice
					</Dropdown.Item>
					<Dropdown.Item href='#/action-5'>
						Completed - invoice sent
					</Dropdown.Item>
					<Dropdown.Item href='#/action-6'>
						Completed - invoice paid
					</Dropdown.Item>
				</DropdownButton>

				{/* <form>
						<span>
							<select name='status' type='text'>
								<option value=''>change order status</option>
								<option value='received'>Received </option>
								<option value='waiting on quote'>
									waiting on quote
								</option>
								<option value='quote approved'>
									quote approved - getting serviced
								</option>
								<option value='pending invoice'>
									completed - pending invoice
								</option>
								<option value='invoice sent'>
									completed - invoice sent
								</option>
								<option value='invoice paid'>
									completed - invoice paid
								</option>
							</select>
							<button type='submit'>Update</button>
						</span>
					</form> */}
				<DropdownButton
					size='lg'
					id='dropdown-basic-button'
					title='Send Quote Request'
					className='btn-block'>
					<Dropdown.Item href='#/action-1'>Utires</Dropdown.Item>
					<Dropdown.Item href='#/action-2'>Durans</Dropdown.Item>
				</DropdownButton>
				{/* <form>
						<span>
							<select name='status' type='text'>
								<option value=''>
									Send Quote request to dealer
								</option>
								<option value='received'>Dealer A </option>
								<option value='waiting on quote'>
									Dealer B
								</option>
							</select>
							<button type='submit'>Send Email Request</button>
						</span>
					</form> */}

				<Button
					size='lg'
					block
					variant='primary'
					onClick={() => this.handleClick(this.props.order)}>
					Check if customer exists in Stripe
				</Button>
				<Button
					size='lg'
					block
					variant='primary'
					disabled={this.state.invoice}
					onClick={() =>
						this.props.createInvoice(
							this.props.order,
							this.props.customer.id
						)
					}>
					Create Invoice
				</Button>
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
