import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
//import {getEventsThunk} from '../store/calendar'
//import Calendar from 'react-google-calendar'
import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
//import '../../public/react-big-calendar.css'

const localizer = momentLocalizer(moment)

//const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

class CalendarView extends Component {
	render() {
		return (
			<div>
				<div>
					<iframe
						src='https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%237CB342&amp;ctz=America%2FChicago&amp;src=Ymlya3VzYW5kcmVAZ21haWwuY29t&amp;src=Zjh2YmVnZXYzYjljMmkyZmNqOHQ2N21vOXNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;src=cW1ra2RpaGk2dGNyZzdtNWs5cDlwZHM3NmQwNm42ZGhAaW1wb3J0LmNhbGVuZGFyLmdvb2dsZS5jb20&amp;src=cnN0M2RmZGZ0MmRlNTdjZjNjMDk0NWpscmp2Y2FvY29AaW1wb3J0LmNhbGVuZGFyLmdvb2dsZS5jb20&amp;color=%2322AA99&amp;color=%23871111&amp;color=%239D7000&amp;color=%23227F63'
						width='900'
						height='800'
						frameBorder='0'
						scrolling='yes'></iframe>
				</div>
			</div>
		)
	}
}

// const mapStateToProps = state => {
// 	return {
// 		calendar: state.calendar,
// 	}
// }

// const mapDispatchToProps = dispatch => {
// 	return {
// 		getEvents: () => dispatch(getEventsThunk()),
// 	}
// }
export default withRouter(connect(null, null)(CalendarView))
