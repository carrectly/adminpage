import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getEventsThunk} from '../store/calendar'
//import Calendar from 'react-google-calendar'
import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
//import '../../public/react-big-calendar.css'

const localizer = momentLocalizer(moment)

class CalendarView extends Component {
	render() {
		const events = this.props.calendar || []
		return (
			<div>
				<div>
					<h1>Calendar coming soon</h1>
					<button
						type='button'
						onClick={() => this.props.getEvents()}>
						View Calendar Events
					</button>
				</div>
				<div>
					<Calendar
						localizer={localizer}
						events={events}
						startAccessor='start'
						endAccessor='end'
						style={{height: 500}}
					/>
				</div>
				<div>
					{events.map(event => (
						<li key={event.id}>{event.summary}</li>
					))}
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		calendar: state.calendar,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getEvents: () => dispatch(getEventsThunk()),
	}
}
export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(CalendarView)
)
