import React from 'react'
import {Navbar, MainFooter} from './components'
import Routes from './routes'
import history from './history'
import {Layout, Breadcrumb} from 'antd'

const {Header, Footer, Sider, Content} = Layout

const App = () => {
	return (
		<div id='appInnerDiv'>
			<Layout>
				<Header className='header'>
					<Navbar />
				</Header>
				<Content>
					<Breadcrumb style={{margin: '16px 0'}}>
						<Breadcrumb.Item>Home</Breadcrumb.Item>
						<Breadcrumb.Item>List</Breadcrumb.Item>
						<Breadcrumb.Item>App</Breadcrumb.Item>
					</Breadcrumb>
					<div className='allContent'>
						<Routes />
					</div>
				</Content>
				<Footer>
					<MainFooter />
				</Footer>
			</Layout>
		</div>
	)
}

export default App
