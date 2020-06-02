// import { postData } from "../Utils"

// export const POST_INTERVIEW = 'POST INTERVIEW'
// export const POST_INTERVIEW_SUCCESS = 'POST_INTERVIEW_SUCCESS'
// export const POST_INTERVIEW_FAILURE = 'POST_INTERVIEW_FAILURE'

// export const postInterview = ()=>{
//     return {
//         type: POST_INTERVIEW
//     }
// }
// export const postInterviewSuccess = (interview)=>{
//     return {
//         type: POST_INTERVIEW_SUCCESS,
//         payload: interview

//     }
// }
// export const postInterviewFailure = (error)=>{
//     return {
//         type: POST_INTERVIEW_FAILURE,
//         payload: error
//     }
// }

// //combining them all in an asynchronous thunk
// export function postNewInterview(interview){
//     return async (dispatch)=>{
//         dispatch(postInterview())
//             let res = await postData("http://localhost:4000/interviews", interview);
//             if(res.error){
//                 dispatch(postInterviewFailure(res.error))
//             }
//             else{
//                 dispatch(postInterviewSuccess(res))
//             }
//     }
// }