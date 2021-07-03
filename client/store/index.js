import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import emails from './emails'
import calendar from './calendar'
import contacts from './contacts'
import singleemail from './singleemail'
import archivedOrders from './archivedOrders'
import activeOrders from './activeOrders'
import userorders from './userorders'
import singleorder from './singleorder'
import dealers from './dealers'
import square from './square'
import singlecustomer from './singlecustomer'
import services from './services'
import comments from './comments'
import drivers from './drivers'
import users from './users'

const reducer = combineReducers({
	user,
	emails,
	calendar,
	contacts,
	singleemail,
	archivedOrders,
	activeOrders,
	userorders,
	singleorder,
	dealers,
	square,
	singlecustomer,
	services,
	comments,
	drivers,
	users,
})

const middleware = composeWithDevTools(
	applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
