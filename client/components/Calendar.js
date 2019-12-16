import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getEventsThunk} from '../store/calendar'
//import Calendar from 'react-google-calendar'
import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
//import '../../public/react-big-calendar.css'

const localizer = momentLocalizer(moment)

//const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

class CalendarView extends Component {
	constructor(props) {
		super(props)
		this.state = {
			events: [],
		}
	}

	async componentDidMount() {
		await this.props.getEvents()

		let evts = this.props.calendar.map(evt => {
			return {
				title: evt.summary,
				start: evt.start.dateTime,
				end: evt.end.dateTime,
			}
		})
		console.log('formatted events', evts)
		this.setState({events: evts})
	}
	render() {
		return (
			<div>
				<Calendar
					localizer={localizer}
					events={this.state.events}
					startAccessor='start'
					endAccessor='end'
					style={{height: 500}}
				/>
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
