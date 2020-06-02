// import * as actions from '../actions/postInterviewAction'
// // initial state
// export const initialState = {
//     loading: false,
//     error: [],
//     interview: {},
// }

// export default function postInterviewReducer(state = initialState, action) {
//     switch (action.type) {
//         case actions.POST_INTERVIEW:
//             return {
//                 ... state,
//                 loading: true
//             }
//             break;
//         case actions.POST_INTERVIEW_SUCCESS:
//             return {
//                 ... state,
//                 loading: false,
//                 interview: action.payload
//             }
//             break;
//         case actions.POST_INTERVIEW_FAILURE:
//             return {
//                 ... state,
//                 loading: false,
//                 error: action.payload
//             }
//             break;
//         default: 
//             return state
//     }
// }
