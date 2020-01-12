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
						src='https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=America%2FChicago&amp;src=Ymlya3VzYW5kcmVAZ21haWwuY29t&amp;src=NmtsbG12bnVzaWJjczBsYm5oOThmZmlxdnNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;color=%2322AA99&amp;color=%2370237F&amp;showPrint=0&amp;showTitle=0&amp;showNav=1'
						frameBorder='1'
						scrolling='yes'></iframe>
				</div>
			</div>
		)
	}
}

export default withRouter(connect(null, null)(CalendarView))
