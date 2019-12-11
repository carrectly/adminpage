import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import AllOrders from './AllOrders'

class Dashboard extends Component {
	render() {
		console.log('OUR USER', this.props.user)
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
				photo:
					'https://www.illustrationsof.com/royalty-free-phone-call-clipart-illustration-440358.jpg',
			},
		]

		return (
			<div className='dashboard-view'>
				<h3 className='center'>Management Dashboard</h3>
				<div className='dashboard-body'>
					<div className='dashboard-card flex-display flex-wrap'>
						<Link to='/orders' className='clean-dashboard'>
							<img
								className='dashboard-image'
								src={list[0].photo}
							/>
							<p>{list[0].name}</p>
						</Link>
					</div>
					<div className='dashboard-card flex-display flex-wrap'>
						<Link to='/allusers' className='clean-dashboard'>
							<img
								className='dashboard-image'
								src={list[1].photo}
							/>
							<p>{list[1].name}</p>
						</Link>
					</div>
					<div className='dashboard-card flex-display flex-wrap'>
						<Link to='/home' className='clean-dashboard'>
							<img
								className='dashboard-image'
								src={list[2].photo}
							/>
							<p>{list[2].name}</p>
						</Link>
					</div>
					<div className='dashboard-card flex-display flex-wrap'>
						<Link to='/home' className='clean-dashboard'>
							<img
								className='dashboard-image'
								src={list[3].photo}
							/>
							<p>{list[3].name}</p>
						</Link>
					</div>
					<div className='dashboard-card flex-display flex-wrap'>
						<Link to='/calendar' className='clean-dashboard'>
							<img
								className='dashboard-image'
								src={list[4].photo}
							/>
							<p>{list[4].name}</p>
						</Link>
					</div>
					<div className='dashboard-card flex-display flex-wrap'>
						<a
							href='https://www.carrectly.com/book/'
							target='_blank'
							className='clean-dashboard'>
							<img
								className='dashboard-image'
								src={list[5].photo}
							/>
							<p>{list[5].name}</p>
						</a>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		user: state.user,
	}
}
// const mapDispatchToProps = dispatch => {
//   return {
//     deletedashboard: id => dispatch(deletedashboardThunk(id))
//   }
// }

export default withRouter(connect(mapStateToProps, null)(Dashboard))
