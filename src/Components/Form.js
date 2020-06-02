import React from 'react'
import {useEffect, useState} from 'react'
import {
    putData,
    utcToLocal,
    localToUtc,
    checkInterviewValidations,
} from "../Utils"
import {reflectFormErrors} from "../AuthUtils"
import {postNewInterview, updateExistingInterview} from '../actions/interviewsActions'
import {connect} from 'react-redux'
import LoadingSpinner from './LoadingSpinner'
import PopUp from './PopUp'

const mapStateToProps = (state)=>{
    return {
        loading: state.interviews.loading,
        error: state.interviews.error,
        interview: state.interviews.interview
    }
}

const mapDispatchToProps = dispatch =>{
    return {
       postNewInterview: (interview, resumes)=> dispatch(postNewInterview(interview,resumes)),
       updateExistingInterview: (interview ,id)=> dispatch(updateExistingInterview(interview,id))
    }
}

const Form = (props) =>{
    let titleRef;
        let starttimeRef;
        let endtimeRef;
        let participantsRef;
        let interviewerRef;

    const [resumes, setResumes] = useState([]);
    const setData = () => {
        titleRef.value = props.title ? props.title : ""
        starttimeRef.value = props.starttime ? utcToLocal(props.starttime) : ""
        endtimeRef.value = props.endtime ? utcToLocal(props.endtime) : ""
        interviewerRef.value = props.members ? props.members.interviewer.id : ""
    }

    const collectFormData = () => {
        let interview = {}
        interview.id = props.id
        interview.title = titleRef.value
        interview.starttime = starttimeRef.value
        interview.endtime = endtimeRef.value
        interview.starttime = localToUtc(interview.starttime);
        interview.endtime = localToUtc(interview.endtime);;
        interview.interviewer = interviewerRef.value
        interview.participants = []
        let options = participantsRef.options
        for (var i = 0, l = participantsRef.options.length; i < l; i++) {
            if (options[i].selected) {
                interview.participants.push(options[i].value);
            }
        }
        return interview
    }
    const onClose = (e) => {
        props.changeEditState ? props.changeEditState() : props.changeCreateState();
    }

    const onClick = (e) => {
        e.preventDefault();
        const formData = collectFormData();
        const errors = checkInterviewValidations(formData);
        if (Object.keys(errors).length !== 0) 
            reflectFormErrors(errors);
         else {
            props.id ? editInterview(formData) : createInterview(formData);
        }
    }

    const editInterview = async (interview) => {
        props.updateExistingInterview({interview:interview}, props.id);
    }
    const collectResumeFiles = async (files) => {
        console.log("files are ", files);
        let formData = new FormData();
        files.forEach((file, index) => {
            console.log("hi")
            console.log("file is ",file);
            console.log("index is ", index);
            formData.append(`file${index}`, file);
        });
        console.log("form data is ",formData);
        return formData;
    }

    const createInterview = async (interview) => {
        props.postNewInterview({interview:interview},resumes);
    }

    const handleFile = (e) => {
        setResumes(Array.from(e.target.files))
    }

    useEffect(() => {
        if(Object.keys(props.interview).length === 0)
            setData();
    }, [])

    useEffect(()=>{
        reflectFormErrors(props.error);
    },[props.error])


    let form;
    if(props.loading){
        form = <LoadingSpinner />
    }
    else{
        form = <div className="card-body">
        <div className="card"
            style={
                {width: "auto"}
        }>
            <div className="card-body">
                <i style={
                        {float: "right"}
                    }
                    class="fa fa-window-close-o"
                    onClick={onClose}
                    aria-hidden="true"></i>
                <form name="Form" id="editForm" enctype ="multipart/form-data">
                    <div className="form-group">
                        <small id="title"
                            style={
                                {color: "red"}
                        }></small><br/>
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control"
                            ref={
                                (input) => {
                                    titleRef = input
                                }
                            }
                            aria-describedby="titleHelp"/>
                        <small id="titleHelp" className="form-text text-muted">try to give a title that is appropriate.</small>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <small id="starttimeerror"></small>
                            <div className="form-group">
                                <small id="starttime"
                                    style={
                                        {color: "red"}
                                }></small><br/>
                                <label htmlFor="starttime">Start Time</label>
                                <input type="datetime-local" className="form-control"
                                    ref={
                                        (input) => {
                                            starttimeRef = input
                                        }
                                    }/>
                            </div>
                    </div>
                    <div className="col-md-6">
                        <small id="endtimeerror"></small>
                        <div className="form-group">
                            <small id="endtime"
                                style={
                                    {color: "red"}
                            }></small><br/>
                            <label htmlFor="endtime">End Time</label>
                            <input type="datetime-local" className="form-control"
                                ref={
                                    (input) => {
                                        endtimeRef = input
                                    }
                                }/>
                        </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-5">
                    <div className="form-group">
                        <small id="interviewer"
                            style={
                                {color: "red"}
                        }></small><br/>
                        <label htmlFor="interviewer">Select Interviewer</label>
                        <select class="custom-select"
                            ref={
                                (input) => {
                                    interviewerRef = input
                                }
                        }> {
                            props.users.map((user) => {
                                return (<option value={
                                    user.id
                                }> {
                                    user.name
                                }</option>)
                            })
                        } </select>
                    </div>
                </div>
                <div className="offset-md-2"></div>
                <div className="col-md-5">
                    <div className="form-group">
                        <small id="participants"
                            style={
                                {color: "red"}
                        }></small><br/>
                        <label htmlFor="interviewer">Select Participants</label>
                        <select class="custom-select" name="participants[]"
                            ref={
                                (input) => {
                                    participantsRef = input
                                }
                            }
                            multiple> {
                            props.users.map((user) => {
                                return (<option value={
                                    user.id
                                }> {
                                    user.name
                                }</option>)
                            })
                        } </select>
                    </div>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-md-5">
                    <div class="custom-file">
                        <input type="file" class="custom-file-input" id="customFile"
                            onChange={handleFile}
                            multiple/>
                        <label className="custom-file-label" for="customFile" data-browse="Add Resumes"></label>
                    </div>
                </div>
                <div className="offset-md-7"></div>
            </div>
            <button onClick={onClick}
                className="btn btn-secondary"
                id="submit">Done</button>
        </form>

    </div>
</div>
</div>
}
    return (
        <>
        {form}
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)