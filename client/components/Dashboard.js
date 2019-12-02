import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import AllOrders from './AllOrders'

class Dashboard extends Component {
	render() {
		const list = [
			{
				id: 1,
				name: 'Bookings',
				photo:
					'https://cdn4.iconfinder.com/data/icons/bold-car-element-1/512/drawing4-512.png',
			},
			{
				id: 2,
				name: 'Users',
				photo:
					'http://icons.iconarchive.com/icons/custom-icon-design/pretty-office-13/512/Users-icon.png',
			},
			{
				id: 3,
				name: 'Maps',
				photo:
					'https://image.flaticon.com/icons/png/512/235/235861.png',
			},
			{
				id: 4,
				name: 'Invoices',
				photo:
					'https://icon-library.net/images/invoice-icon-png/invoice-icon-png-17.jpg',
			},
			{
				id: 5,
				name: 'Calendar',
				photo:
					'https://p7.hiclipart.com/preview/74/186/347/computer-icons-google-calendar-calendar-date-png-calendar-icon.jpg',
			},
			{
				id: 6,
				name: "Create a booking on client's behalf",
				photo: 'http://clipart-library.com/img/1725068.gif',
			},
		]

		return (
			<div className='dashboard-view'>
				<h3 className='center'>Management Dashboard</h3>
				<div className='dashboard-body'>
					{list.map(ctg => (
						<div
							key={ctg.id}
							className='dashboard-card flex-display flex-wrap'>
							<Link to='/service' className='clean-dashboard'>
								<img
									className='dashboard-image'
									src={ctg.photo}
								/>
								<p>{ctg.name}</p>
							</Link>
						</div>
					))}
				</div>
			</div>
		)
	}
}

// const mapStateToProps = state => {
//   return {
//     categories: state.categories,
//     isAdmin: state.user.isAdmin
//   }
// }
// const mapDispatchToProps = dispatch => {
//   return {
//     deletedashboard: id => dispatch(deletedashboardThunk(id))
//   }
// }

export default withRouter(connect(null, null)(Dashboard))
