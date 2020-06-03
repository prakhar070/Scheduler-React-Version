import * as actions from '../actions/usersActions'
// initial state
export const initialState = {
    users: [],
    loading: false,
    error: ""
}

export default function usersReducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_USERS:
            return {
                ... state,
                loading: true
            }
            break;
        case actions.GET_USERS_SUCCESS:
            return {
                ... state,
                loading: false,
                users: action.payload
            }
            break;
        case actions.GET_USERS_FAILURE:
            return {
                ... state,
                loading: false,
                error: action.payload
            }
            break;
        default: 
            return state
    }
}
