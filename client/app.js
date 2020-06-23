import React from 'react'
import {Navbar, MainFooter} from './components'
import Routes from './routes'
import history from './history'

const App = () => {
	return (
		<div id='appInnerDiv'>
			<Navbar />
			<div className='allContent'>
				<Routes />
			</div>
			<MainFooter />
		</div>
	)
}

export default App
