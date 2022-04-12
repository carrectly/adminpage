import { Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MainFooter, Navbar } from '../components';
import AppRoutes from './routes';
import { useLocation } from 'react-router-dom';
const { Header, Footer, Content } = Layout;

const App = () => {
  const isAuthorized = useSelector((state) => state.user.isAuthorized);
  const [showHeader, setShow] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    if (isAuthorized && isAuthorized == true) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [isAuthorized]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {showHeader && pathname !== '/login' && (
        <Header className="header" style={{ padding: '0' }}>
          <Navbar />
        </Header>
      )}
      <Content style={{ height: '100%', padding: '0 10px' }}>
        <div className="allContent">
          <AppRoutes />
        </div>
      </Content>
      <Footer style={{ padding: '0' }}>
        <MainFooter />
      </Footer>
    </Layout>
  );
};

export default App;
