import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'

class CalendarView extends Component {
	render() {
		return (
			<div>
				<div>
					<iframe
						className='calendar'
						src='https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%238E24AA&amp;ctz=America%2FChicago&amp;src=Ymlya3VzYW5kcmVAZ21haWwuY29t&amp;color=%2322AA99&amp;showPrint=0&amp;showTitle=0&amp;showCalendars=0&amp;showTz=1&amp;showDate=1'
						frameBorder='1'
						scrolling='yes'></iframe>
				</div>
			</div>
		)
	}
}

export default withRouter(connect(null, null)(CalendarView))

//src='https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%237CB342&amp;ctz=America%2FChicago&amp;src=Ymlya3VzYW5kcmVAZ21haWwuY29t&amp;src=Zjh2YmVnZXYzYjljMmkyZmNqOHQ2N21vOXNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;src=cW1ra2RpaGk2dGNyZzdtNWs5cDlwZHM3NmQwNm42ZGhAaW1wb3J0LmNhbGVuZGFyLmdvb2dsZS5jb20&amp;src=cnN0M2RmZGZ0MmRlNTdjZjNjMDk0NWpscmp2Y2FvY29AaW1wb3J0LmNhbGVuZGFyLmdvb2dsZS5jb20&amp;color=%2322AA99&amp;color=%23871111&amp;color=%239D7000&amp;color=%23227F63'
//<iframe src='https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%237CB342&amp;ctz=America%2FChicago&amp;src=Ymlya3VzYW5kcmVAZ21haWwuY29t&amp;src=Zjh2YmVnZXYzYjljMmkyZmNqOHQ2N21vOXNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;src=cW1ra2RpaGk2dGNyZzdtNWs5cDlwZHM3NmQwNm42ZGhAaW1wb3J0LmNhbGVuZGFyLmdvb2dsZS5jb20&amp;src=cnN0M2RmZGZ0MmRlNTdjZjNjMDk0NWpscmp2Y2FvY29AaW1wb3J0LmNhbGVuZGFyLmdvb2dsZS5jb20&amp;color=%2322AA99&amp;color=%23871111&amp;color=%239D7000&amp;color=%23227F63'scrolling='yes'>
//<iframe src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%238E24AA&amp;ctz=America%2FChicago&amp;src=Ymlya3VzYW5kcmVAZ21haWwuY29t&amp;color=%2322AA99&amp;showPrint=0&amp;showTitle=0&amp;showCalendars=0&amp;showTz=1&amp;showDate=1" style="border:solid 1px #777" frameborder="1" scrolling="yes"></iframe>
