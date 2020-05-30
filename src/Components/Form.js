import React from 'react'
import {useEffect} from 'react'
export default function Form(props) {
    let titleRef = null;
    let starttimeRef = null;
    let endtimeRef = null;

    const setData = () => { // this function runs automatically and initializes the form values
        titleRef.value = props.title ? props.title : ""
        starttimeRef.value = props.starttime ? props.endtime : ""
        endtimeRef.value = props.endtime ? props.endtime : ""
    }

    const getData = () => {
        let interview = {}
        interview.id = props.id
        interview.title = titleRef.value
        interview.starttime = starttimeRef.value
        interview.endtime = endtimeRef.value
        return interview
    }
    const onClose = (e) => {
        props.changeEditState ? props.changeEditState() : props.changeCreateState();
    }
    const onClick = (e) => {
        props.onEdit ? props.onEdit(e, getData()) : props.onCreate(e, getData());
        onClose();
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
                    <i style={{float:"right"}} class="fa fa-window-close-o" onClick={onClose} aria-hidden="true"></i>
                    <form name="Form" id="editForm">
                        <div className="form-group">
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
                            <div className="col-md-5">
                                <small id="starttimeerror"></small>
                                <div className="form-group">
                                    <label htmlFor="starttime">Start Time</label>
                                    <input type="datetime-local" className="form-control"
                                        ref={
                                            (input) => {
                                                starttimeRef = input
                                            }
                                        }/>
                                </div>
                        </div>
                        <div className="offset-md-2"></div>
                        <div className="col-md-5">
                            <small id="endtimeerror"></small>
                            <div className="form-group">
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
                            <label htmlFor="interviewer">Select Interviewer</label>
                            <select class="custom-select">
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
                            <label htmlFor="interviewer">Select Participants</label>
                            <select class="custom-select" multiple>
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
