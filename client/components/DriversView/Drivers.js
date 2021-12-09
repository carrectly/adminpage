
import React, {Component} from 'react'
import {connect} from 'react-redux'
import AddDriver from './AddDriver.js'
import {removeDriverThunk, fetchDriversThunk} from '../../store/drivers.js'
import DriverCard from './DriverCard'
import {Popover} from 'antd'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons'

class Drivers extends Component {
	constructor(props) {
		super(props)
		this.setModalShow = this.setModalShow.bind(this)
		this.state = {
			modalShow: false,
		}
	}

	setModalShow(bool) {
		this.setState({modalShow: bool})
	}

	async componentDidMount() {
		try {
			await this.props.fetchDrivers()
		} catch (err) {
			console.log(err)
		}
	}

	render() {
		const drivers = this.props.drivers
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
											delete={this.props.remove}
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
							onClick={() => this.setModalShow(true)}
							icon={faPlusCircle}
						/>
					</Popover>
					<AddDriver
						show={this.state.modalShow}
						onHide={() => this.setModalShow(false)}
					/>
				</div>
			</div>
		)
	}
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
