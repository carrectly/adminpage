import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import { BrowserRouter } from "react-router-dom";
import App from './app'
import store from './store'
import 'antd/dist/antd.css'
import './components/styles/styles.scss'

ReactDOM.render(
	<Provider store={store}>
		{/* <Router history={history}> */}
    <BrowserRouter>
			<App />
      </BrowserRouter>
		{/* </Router> */}
	</Provider>,
	document.getElementById('app')
)
