
import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import AddDriver from './AddDriver.js'
import {removeDriverThunk, fetchDriversThunk} from '../../store/drivers.js'
import DriverCard from './DriverCard'
import {Popover} from 'antd'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons'

const Drivers = (props) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    props.fetchDrivers()
  }, [])


		const drivers = props.drivers
		return (
			<div>
				<div>
					{drivers.length ? (
						<div>
							<div className='alldealersview'>
								{drivers.map(dlr => (
									<div key={dlr.id} className='dealerCard'>
										<DriverCard
											key={dlr.id}
											driver={dlr}
											delete={props.remove}
										/>
									</div>
								))}
							</div>
						</div>
					) : (
						<h1>No drivers found</h1>
					)}
				</div>
				<div>
					<Popover content='Click here to add a new driver'>
						<FontAwesomeIcon
							className='float-plus'
							onClick={() => setShow(true)}
							icon={faPlusCircle}
						/>
					</Popover>
					<AddDriver
						show={show}
						onHide={() => setShow(false)}
					/>
				</div>
			</div>
		)
}

const mapStateToProps = state => {
	return {
		drivers: state.drivers,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		remove: id => dispatch(removeDriverThunk(id)),
		fetchDrivers: () => dispatch(fetchDriversThunk()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Drivers)
