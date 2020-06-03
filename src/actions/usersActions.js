import { getData } from "../Utils"

export const GET_USERS = 'GET USERS'
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS'
export const GET_USERS_FAILURE = 'GET_USERS_FAILURE'

export const getUsers = ()=>{
    return {
        type: GET_USERS
    }
}
export const getUsersSuccess = (users)=>{
    return {
        type: GET_USERS_SUCCESS,
        payload: users
    }
}
export const getUsersFailure = (error)=>{
    return {
        type: GET_USERS_FAILURE,
        payload: error
    }
}


//combining them all in an asynchronous thunk
export function fetchUsers(){
    return async (dispatch)=>{
        dispatch(getUsers())
        try {
            const data = await getData("http://localhost:4000/users");
            dispatch(getUsersSuccess(data))
        } catch (error) {
            dispatch(getUsersFailure(error))
        }
    }
}