import React from 'react'
import {Collapse} from 'antd'
const {Panel} = Collapse

import CollapseTrips from './CollapseTrips'

const CollapseByBothDates = props => {
	return (
		<Collapse defaultActiveKey={['1']}>
			<Panel key='1' header='Trips' style={{backgroundColor: '#6AEB6F'}}>
				<CollapseTrips orders={props.confirmedTrips} />
			</Panel>
		</Collapse>
	)
}

export default CollapseByBothDates
