import { EditFilled, UnlockFilled } from '@ant-design/icons';
import { Tabs } from 'antd';
import React from 'react';
import { SignupForm } from './signUpForm';
import { LoginForm } from './loginForm';
import logo from '../../images/logo.png';
const { TabPane } = Tabs;

const AuthPage = () => {
  return (
    <div className="login">
      <div className="login-logo">
        <img src={logo} alt="carrectly-logo" width={200} />
      </div>
      <div className="greeting">
        <h2>Welcome Carrectly Admin.</h2>
        <h3>Login with Google to access all the features</h3>
      </div>
      <Tabs
        type="card"
        defaultActiveKey="1"
        style={{ margin: '0px 0px 10px 0px' }}
        centered={true}
        size="large"
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
          <LoginForm />
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
          <SignupForm />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AuthPage;
