import { Link} from 'react-router-dom'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import AddDealer from './AddDealer.js'
import {removeDealerThunk, fetchDealersThunk} from '../../store/dealers.js'
import DealerCard from './DealerCard'
import {Popover} from 'antd'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons'

class Dealers extends Component {
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
			await this.props.fetchDealers()
		} catch (err) {
			console.log(err)
		}
	}

	render() {
		const dealers = this.props.dealers
		return (
			<div>
				<div>
					{dealers.length ? (
						<div>
							<div className='alldealersview'>
								{dealers.map(dlr => (
									<div key={dlr.id} className='dealerCard'>
										<DealerCard
											key={dlr.id}
											dealer={dlr}
											delete={this.props.remove}
										/>
									</div>
								))}
							</div>
						</div>
					) : (
						<h1>No dealers Found</h1>
					)}
				</div>
				<div>
					<Popover content='Click here to add a dealer'>
						<FontAwesomeIcon
							className='float-plus'
							onClick={() => this.setModalShow(true)}
							icon={faPlusCircle}
						/>
					</Popover>
					<AddDealer
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
		dealers: state.dealers,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		remove: id => dispatch(removeDealerThunk(id)),
		fetchDealers: () => dispatch(fetchDealersThunk()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dealers)
