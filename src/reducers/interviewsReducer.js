import * as actions from '../actions/interviewsActions'
// initial state
export const initialState = {
    interviews: [],
    interview: {},
    loading: false,
    error: {},
    categories: ["interviewed", "organized", "participated"]
}

export default function interviewsReducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_INTERVIEWS:
            return {
                ... state,
                loading: true
            }
            break;
        case actions.GET_INTERVIEWS_SUCCESS:
            return {
                ... state,
                loading: false,
                interviews: action.payload,
                interview: {}
            }
            break;
        case actions.GET_INTERVIEWS_FAILURE:
            return {
                ... state,
                loading: false,
                error: action.payload
            }
            break;
        case actions.POST_INTERVIEW:
            return {
                ... state,
                loading: true
            }
            break;
        case actions.POST_INTERVIEW_SUCCESS:
            return {
                ... state,
                loading: false,
                interview: action.payload
            }
            break;
        case actions.POST_INTERVIEW_FAILURE:
            return {
                ... state,
                loading: false,
                error: action.payload
            }
            break;
        case actions.UPDATE_INTERVIEW:
            return {
                ... state,
                loading: true
            }
            break;
        case actions.UPDATE_INTERVIEW_SUCCESS:
            return {
                ... state,
                loading: false,
                interview: action.payload
            }
            break;
        case actions.UPDATE_INTERVIEW_FAILURE:
            return {
                ... state,
                loading: false,
                error: action.payload
            }
            break;
        case actions.CHANGE_CATEGORIES:
            return {
                ... state,
                categories: action.payload
            }
            break;
        default:
            return state
    }
}
