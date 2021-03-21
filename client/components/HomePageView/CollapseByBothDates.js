import React from 'react'
import {Collapse} from 'antd'
const {Panel} = Collapse

import CollapseTrips from './CollapseTrips'

const CollapseByBothDates = props => {
	return (
		<Collapse>
			<Panel
				key='1'
				header='Confirmed Trips'
				style={{backgroundColor: '#6AEB6F'}}>
				<CollapseTrips orders={props.confirmedTrips} />
			</Panel>
			<Panel
				key='2'
				header='Potential Trips'
				style={{backgroundColor: '#DFFF00'}}>
				<CollapseTrips orders={props.potentialTrips} />
			</Panel>
		</Collapse>
	)
}

export default CollapseByBothDates
