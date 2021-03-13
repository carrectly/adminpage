import React from 'react'
import {Navbar, MainFooter} from './components'
import Routes from './routes'
import history from './history'
import {Layout, Breadcrumb} from 'antd'

const {Header, Footer, Content} = Layout

const App = () => {
	return (
		<Layout style={{minHeight: '100vh'}}>
			<Header className='header' style={{padding: '0'}}>
				<Navbar />
			</Header>
			<Content style={{height: '100%', padding: '0 10px'}}>
				<Breadcrumb style={{margin: '16px 0'}}>
					<Breadcrumb.Item>Home</Breadcrumb.Item>
					<Breadcrumb.Item>List</Breadcrumb.Item>
					<Breadcrumb.Item>App</Breadcrumb.Item>
				</Breadcrumb>
				<div className='allContent'>
					<Routes />
				</div>
			</Content>
			<Footer style={{padding: '0'}}>
				<MainFooter />
			</Footer>
		</Layout>
	)
}

export default App
