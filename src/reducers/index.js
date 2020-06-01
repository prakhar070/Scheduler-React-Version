import {combineReducers} from 'redux'

//all the reducers made by us
import usersReducer from './usersReducer'

const rootReducer = combineReducers({
    users: usersReducer,
})

export default rootReducer