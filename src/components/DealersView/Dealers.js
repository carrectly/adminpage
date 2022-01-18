import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import AddDealer from './AddDealer.js'
import { removeDealerThunk, fetchDealersThunk } from '../../store/dealers.js'
import DealerCard from './DealerCard'
import { Popover } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

const Dealers = (props) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    props.fetchDealers()
  }, [])

  const dealers = props.dealers
  return (
    <div>
      <div>
        {dealers.length ? (
          <div>
            <div className="alldealersview">
              {dealers.map((dlr) => (
                <div key={dlr.id} className="dealerCard">
                  <DealerCard key={dlr.id} dealer={dlr} delete={props.remove} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <h1>No dealers Found</h1>
        )}
      </div>
      <div>
        <Popover content="Click here to add a dealer">
          <FontAwesomeIcon
            className="float-plus"
            onClick={() => setShow(true)}
            icon={faPlusCircle}
          />
        </Popover>
        <AddDealer show={show} onHide={() => setShow(false)} />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    dealers: state.dealers,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    remove: (id) => dispatch(removeDealerThunk(id)),
    fetchDealers: () => dispatch(fetchDealersThunk()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dealers)
