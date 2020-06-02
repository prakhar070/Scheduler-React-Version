import { getData } from "../Utils"

export const GET_INTERVIEWS = 'GET INTERVIEWS'
export const GET_INTERVIEWS_SUCCESS = 'GET_INTERVIEWS_SUCCESS'
export const GET_INTERVIEWS_FAILURE = 'GET_INTERVIEWS_FAILURE'


export const getInterviews = ()=>{
    return {
        type: GET_INTERVIEWS
    }
}
export const getInterviewsSuccess = (interviews)=>{
    return {
        type: GET_INTERVIEWS_SUCCESS,
        payload: interviews
    }
}
export const getInterviewsFailure = (error)=>{
    return {
        type: GET_INTERVIEWS_FAILURE,
        payload: error
    }
}

const mapp = (interviews) => {
    const promises = interviews.map(async (interview) => {
        const interviewData = await getData(`http://localhost:4000/interviews/${interview.id}`);
        return interviewData;
    });
    return Promise.all(promises);
}


//combining them all in an asynchronous thunk
export function fetchInterviews(){
    return async (dispatch)=>{
        dispatch(getInterviews())
        try {
            let data = await getData("http://localhost:4000/interviews");
            console.log("data is ", data );
            data = data.interviews.organized.concat(data.interviews.participated).concat(data.interviews.interviewed);
            data = await mapp(data);
            dispatch(getInterviewsSuccess(data))
        } catch (error) {
            dispatch(getInterviewsFailure(error))
        }
    }
}