import React from 'react'
import {Navbar, MainFooter} from './components'
import AppRoutes from './routes'
import {Layout, Breadcrumb} from 'antd'
const {Header, Footer, Content} = Layout

const App = () => {
	return (
		<Layout style={{minHeight: '100vh'}}>
			<Header className='header' style={{padding: '0'}}>
				<Navbar />
			</Header>
			<Content style={{height: '100%', padding: '0 10px'}}>
				<div className='allContent'>
					<AppRoutes />
				</div>
			</Content>
			<Footer style={{padding: '0'}}>
				<MainFooter />
			</Footer>
		</Layout>
	)
}

export default App
