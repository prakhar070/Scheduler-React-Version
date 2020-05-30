import React from 'react'
import {useEffect} from 'react'
import moment from 'moment'

export default function Form(props) {
    let titleRef = null;
    let starttimeRef = null;
    let endtimeRef = null;
    let participantsRef = null;
    let interviewerRef = null;

    const setData = () => { // this function runs automatically and initializes the form values
        titleRef.value = props.title ? props.title : ""
        if(props.starttime){
            let localvalue =  moment.utc(props.starttime).local().format();
            localvalue = localvalue.substr(0, localvalue.indexOf("+"));
            starttimeRef.value = localvalue;
        } 
        if(props.endtime){
            let localvalue =  moment.utc(props.endtime).local().format();
            localvalue = localvalue.substr(0, localvalue.indexOf("+"));
            endtimeRef.value = localvalue;
        } 
        interviewerRef.value = props.members ? props.members.interviewer.id : ""
    }
    const postData = async (url = '', data = {}) => {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${
                    localStorage.getItem("token")
                }`
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        });
        const jsondata = await response.json();
        return jsondata;
    }


    const putData = async (url = '', data = {}) => {
        const response = await fetch(url, {
            method: 'PUT',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${
                    localStorage.getItem("token")
                }`
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        });
        const jsondata = await response.json();
        return jsondata;
    }
    const getData = () => {
        let interview = {}
        interview.id = props.id
        interview.title = titleRef.value
        interview.starttime = starttimeRef.value
        interview.endtime = endtimeRef.value
        interview.starttime = new Date(interview.starttime).toUTCString();
        interview.endtime = new Date(interview.endtime).toUTCString();
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
    const checkInterviewValidations = ({
        title,
        starttime,
        endtime,
        interviewer,
        participants
    }) => {
        if(!starttime)
            console.log("$$$$$$$$$$$$$$$$$$$$$$$4")
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%", title)
        const errors = {}
        if (title === "") 
            errors.title = "please provide a title"
        
        if (endtime === "") 
            errors.endtime = "please provide an end time"
        
        if (starttime === "") 
            errors.starttime = "please provide a start time"
        
        if (!interviewer) 
            errors.interviewer = "please select an interviewer"
        
        if (starttime !== "" && new Date(starttime) <= new Date()) 
            errors.starttime = "this ain't a time machine!!"
        
        if (title !== "" && title.length < 3) 
            errors.title = "provide a valid title with minimum length of 3";
        
        if (starttime !== "" && endtime && starttime >= endtime) 
            errors.starttime = "starttime must be less than endtime";
        
        if (participants.length == 0) 
            errors.participants = "atleast one participant must be selected";
        
        return errors;
    }
    const reflectFormErrors = (errors) => {
        document.getElementById("title").innerText = errors.title ? errors.title : ""
        document.getElementById("starttime").innerText = errors.starttime ? errors.starttime : ""
        document.getElementById("endtime").innerText = errors.endtime ? errors.endtime : ""
        document.getElementById("interviewer").innerText = errors.interviewer ? errors.interviewer : ""
        document.getElementById("participants").innerText = errors.participants ? errors.participants : ""
    }

    const onClick = (e) => {
        // e.preventDefault();
        // const formData = getData();
        // const errors = checkInterviewValidations(formData);
        // if(Object.keys(errors).length !== 0)
        //     reflectFormErrors(errors);
        // else{
        //     props.onEdit ? props.onEdit(e, formData) : props.onCreate(e, formData);
        //     onClose();
        // }

        // on click I need to create interview or edit interview and then if everything goes right, I will call props.onEdit and props.onCreate
        e.preventDefault();
        const formData = getData();
        const errors = checkInterviewValidations(formData);
        if (Object.keys(errors).length !== 0) 
            reflectFormErrors(errors);
         else {
            props.id ? editInterview(formData) : createInterview(formData);
            // props.onEdit ? props.onEdit(e, formData) : props.onCreate(e, formData);
        }
    }

    const editInterview = async (interview) => {
        const res = await putData(`http://localhost:4000/interviews/${
            props.id
        }`, {interview: interview});
        console.log("res is ", res);
        if (res.error) { // print errors in form here
            reflectFormErrors(res.error);
        } else {
            alert("interview updated successfully");
            props.handleSuccessfullCreateEdit();
            onClose();
        }
    }
    const createInterview = async (interview) => {
        const res = await postData("http://localhost:4000/interviews/", {interview: interview});
        console.log("res is ", res);
        if (res.error) { // print errors in form here
            reflectFormErrors(res.error);
        } else {
            alert("interview created successfully");
            props.handleSuccessfullCreateEdit();
            onClose();
        }
    }

    useEffect(() => {
        setData();
    }, [])

    return (
        <div className="card-body">
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
                    <form name="Form" id="editForm">
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
                                        } />
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
                            }>
                                {
                                props.users.map((user) => {
                                    return (
                                        <option value={
                                            user.id
                                        }>
                                            {
                                            user.name
                                        }</option>
                                    )
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
                                multiple>
                                {
                                props.users.map((user) => {
                                    return (
                                        <option value={
                                            user.id
                                        }>
                                            {
                                            user.name
                                        }</option>
                                    )
                                })
                            } </select>
                        </div>
                    </div>
                </div>
                <button onClick={onClick}
                    className="btn btn-secondary"
                    id="submit">Done</button>
            </form>
        </div>
    </div>
</div>
    )
}
