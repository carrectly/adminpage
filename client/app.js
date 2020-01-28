import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import history from './history'

const App = () => {
	console.log('history', history)
	return (
		<div>
			<Navbar />
			<Routes />
		</div>
	)
}

export default App
