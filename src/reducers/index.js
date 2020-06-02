import {combineReducers} from 'redux'

//all the reducers made by us
import usersReducer from './usersReducer'
import interviewsReducer from './interviewsReducer'
import postInterviewReducer from './postInterviewReducer'

const rootReducer = combineReducers({
    users: usersReducer,
    interviews: interviewsReducer,
    postInterview: postInterviewReducer
})

export default rootReducer