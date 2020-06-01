import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchInterviews} from '../actions/interviewsActions'


const InterviewsRedux = ({dispatch})=> {
    useEffect(()=>{
        dispatch(fetchInterviews())
    },[])
    
    return (
        <div>
            <h1>interviews</h1>
        </div>
    )
}

const mapStateToProps = (state)=>{
    
    return {
        loading: state.interviews.loading,
        interviews: state.interviews.interviews,
        error: state.interviews.error
    }
}
export default connect(mapStateToProps)(InterviewsRedux)
