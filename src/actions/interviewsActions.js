import { getData, postData ,putData, postResumeData} from "../Utils"

export const GET_INTERVIEWS = 'GET INTERVIEWS'
export const GET_INTERVIEWS_SUCCESS = 'GET_INTERVIEWS_SUCCESS'
export const GET_INTERVIEWS_FAILURE = 'GET_INTERVIEWS_FAILURE'
export const POST_INTERVIEW = 'POST INTERVIEW'
export const POST_INTERVIEW_SUCCESS = 'POST_INTERVIEW_SUCCESS'
export const POST_INTERVIEW_FAILURE = 'POST_INTERVIEW_FAILURE'
export const UPDATE_INTERVIEW = 'UPDATE INTERVIEW'
export const UPDATE_INTERVIEW_SUCCESS = 'UPDATE_INTERVIEW_SUCCESS'
export const UPDATE_INTERVIEW_FAILURE = 'UPDATE_INTERVIEW_FAILURE'
export const CHANGE_CATEGORIES = 'CHANGE_CATEGORIES'



export const changeCategories = (categories)=>{
    return{
        type: CHANGE_CATEGORIES,
        payload: categories
    }
}

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
export function fetchInterviews(categories = ["organized", "participated", "interviewed"]){
    return async (dispatch)=>{
        dispatch(getInterviews())
        try {
            let data = await getData("http://localhost:4000/interviews");
            console.log("data is ", data );
            let finalData = []
            categories.forEach((category)=>{
                finalData = finalData.concat(data.interviews[`${category}`]);
            })
            // data = data.interviews.organized.concat(data.interviews.participated).concat(data.interviews.interviewed);
            console.log("final data is ", finalData);
            finalData = await mapp(finalData);
            dispatch(getInterviewsSuccess(finalData))
            dispatch(changeCategories(categories));
        } catch (error) {
            dispatch(getInterviewsFailure(error))
        }
    }
}


export const postInterview = ()=>{
    return {
        type: POST_INTERVIEW
    }
}
export const postInterviewSuccess = (interview)=>{
    return {
        type: POST_INTERVIEW_SUCCESS,
        payload: interview

    }
}
export const postInterviewFailure = (error)=>{
    return {
        type: POST_INTERVIEW_FAILURE,
        payload: error
    }
}

//combining them all in an asynchronous thunk
export function postNewInterview(interview, resumes){
    return async (dispatch)=>{
        dispatch(postInterview())
            let res = await postData("http://localhost:4000/interviews", interview);
            console.log("received res is ", res);
            if(res.error){
                dispatch(postInterviewFailure(res.error))
            }
            else{
                //send the resumes as well
                console.log("resumes are ", resumes , "and id is ", res.id)
                let formData = new FormData();
                resumes.forEach((resume, index) => {
                    formData.append(`file${index}`,resume);
                });
                res = await postResumeData(`http://localhost:4000/interviews/${res.id}/resumes`,formData);
                if(res.error){
                    dispatch(postInterviewFailure(res.error))
                }
                else{
                    dispatch(postInterviewSuccess(res))
                }
            }
    }
}


export const updateInterview = ()=>{
    return {
        type: UPDATE_INTERVIEW
    }
}
export const updateInterviewSuccess = (interview)=>{
    return {
        type: UPDATE_INTERVIEW_SUCCESS,
        payload: interview

    }
}
export const updateInterviewFailure = (error)=>{
    return {
        type: UPDATE_INTERVIEW_FAILURE,
        payload: error
    }
}

//combining them all in an asynchronous thunk
export function updateExistingInterview(interview,id){
    return async (dispatch)=>{
        dispatch(updateInterview())
            let res = await putData(`http://localhost:4000/interviews/${id}`, interview);
            if(res.error){
                dispatch(updateInterviewFailure(res.error))
            }
            else{
                dispatch(updateInterviewSuccess(res))
            }
    }
}