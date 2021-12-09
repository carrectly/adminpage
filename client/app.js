import React from 'react'
import {Navbar, MainFooter} from './components'
import AppRoutes from './routes'
import history from './history'
import {Layout, Breadcrumb} from 'antd'
import {useLocation} from 'react-router-dom'
const {Header, Footer, Content} = Layout

const App = () => {
	const location = useLocation()
	const crumbs = location.pathname.split('/')
	return (
		<Layout style={{minHeight: '100vh'}}>
			<Header className='header' style={{padding: '0'}}>
				<Navbar />
			</Header>
			<Content style={{height: '100%', padding: '0 10px'}}>
				{/* TODO: add and style breadcrumbs */}
				{/* <Breadcrumb style={{margin: '16px 0'}}>
					{crumbs.map(el => (
						<Breadcrumb.Item key={el}>{el}</Breadcrumb.Item>
					))}
				</Breadcrumb> */}
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
