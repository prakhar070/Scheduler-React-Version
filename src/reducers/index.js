import {combineReducers} from 'redux'

//all the reducers made by us
import usersReducer from './usersReducer'
import interviewsReducer from './interviewsReducer'

const rootReducer = combineReducers({
    users: usersReducer,
    interviews: interviewsReducer
})

export default rootReducer