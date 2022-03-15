import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Login, Signup } from './auth-form'
import AdminMenu from './HomePageView/Admin/AdminMenu'
import TableByDriver from './HomePageView/Driver/TableByDriver'
import TableByDetailer from './HomePageView/Detailer/TableByDetailer'
import { Tabs } from 'antd'
const { TabPane } = Tabs
import { UnlockFilled, EditFilled } from '@ant-design/icons'

const Account = (props) => {
  if (props.user.id) {
    if (props.user.role === 'unconfirmed') {
      return (
        <React.Fragment>
          <div>Welcome. Your account needs to be appoved by the admin!</div>
        </React.Fragment>
      )
    } else if (props.user.role === 'driver') {
      return (
        <React.Fragment>
          <TableByDriver email={props.user.email} />
        </React.Fragment>
      )
    } else if (props.user.role === 'detailer') {
      return (
        <React.Fragment>
          <TableByDetailer />
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <AdminMenu />
        </React.Fragment>
      )
    }
  } else {
    return (
      <div className="login">
        <h3 className="greeting">
          Welcome Carrectly Admin.
          <br />
          Login with Google to access all the features
        </h3>
        <Tabs
          type="card"
          defaultActiveKey="1"
          style={{ margin: '0px 0px 10px 0px' }}
          centered={true}
        >
          <TabPane
            key="1"
            tab={
              <span>
                <UnlockFilled />
                Login
              </span>
            }
          >
            <Login />
          </TabPane>
          <TabPane
            key="2"
            tab={
              <span>
                <EditFilled />
                Register
              </span>
            }
          >
            <Signup />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default withRouter(connect(mapStateToProps, null)(Account))
