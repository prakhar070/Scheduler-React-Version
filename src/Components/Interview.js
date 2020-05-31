import React from 'react'
import {useState} from 'react'
import Form from './Form'
import '../css/Interview.css'
import {utcToLocal} from '../Utils'
export default function Interview(props) {
    const [editState, setEditState] = useState(false)
    const [detailState, setDetailState] = useState(false)
    const [detailText, setDetailText] = useState("View Details")
    const getFormattedDisplay = (starttime, endtime) => {
        let localSt = utcToLocal(starttime);
        let localEt = utcToLocal(endtime);
        const dt = localSt.substr(0, localSt.indexOf("T"));
        const start = localSt.substr(localSt.indexOf("T") + 1);
        const end = localEt.substr(localEt.indexOf("T") + 1);
        return `${dt}, ${start} - ${end}`;
    }
    const changeDetailState = () => {
        if (!detailState) {
            setDetailState(true)
            setDetailText("View Less")
        } else {
            setDetailState(false)
            setDetailText("View Details")
        }
    }
    const changeEditState = () => {
        if (!editState) 
            setEditState(true)
         else 
            setEditState(false)
    }
    const resumes = [];
    props.resumes.forEach((resume)=>{
        resumes.push(<a class="list-inline-item" href={resume}>Resume{Math.random().toString(36).substring(4)}</a>)
    })
    return (<div>
        <div className="card mt-4">
            <div className="card-header">
                <h4> {
                    props.title
                }</h4>
                <i class="fa fa-clock-o ml-4 mr-2" aria-hidden="true"></i>
                {
                getFormattedDisplay(props.starttime, props.endtime)
            }
                <a className="card-link"
                    onClick={changeDetailState}
                    style={
                        {float: "right"}
                }> {detailText}</a>
            </div>
            <div className="card-body"> {
                (() => {
                    if (detailState) {
                        return (<div className="card"
                            style={
                                {width: "auto"}
                        }>
                            <div className="card-body">
                                <span style={
                                    {float: "left"}
                                }>
                                    <h5 className="card-title"> {
                                        props.members.interviewer.name
                                    }
                                        <small className="text-muted">(Interviewer)</small>
                                    </h5>
                                    <h6 className="card-subtitle mb-2 text-muted"> {
                                        props.members.interviewer.email
                                    }</h6>
                                </span>
                                <span style={
                                    {float: "right"}
                                }>
                                    <h5 className="card-title"> {
                                        props.members.organizer.name
                                    }
                                        <small className="text-muted">(organizer)</small>
                                    </h5>
                                    <h6 className="card-subtitle mb-2 text-muted"> {
                                        props.members.organizer.email
                                    }</h6>
                                </span>
                                <p className="card-text">
                                    <table className="table table-hover table-dark mt-2">
                                        <thead>
                                            <tr>
                                                <th scope="col">Name</th>
                                                <th scope="col">Email</th>
                                            </tr>
                                        </thead>
                                        <tbody> {
                                            props.members.participants.map((participant) => {
                                                return (<tr>
                                                    <td> {
                                                        participant.name
                                                    }
                                                        <small className="text-muted">
                                                            (participant)</small>
                                                    </td>
                                                    <td> {
                                                        participant.email
                                                    }</td>
                                                </tr>)
                                            })
                                        } </tbody>
                                    </table>
                                </p>
                                <i class="fa fa-pencil-square-o mx-1" aria-hidden="true"></i>
                                <a className="card-link"
                                    onClick={changeEditState}>Edit</a>
                                <a className="card-link"
                                    onClick={
                                        props.onDelete.bind(this, props.id)
                                }>Delete</a>
                                <i class="fa fa-trash ml-8 mr-1" aria-hidden="true"></i>
                                <div className="row mt-1">
                                    <ul className="list-inline"> Resumes - {
                                       resumes
                                    }</ul>
                                </div>
                            </div>
                        </div>)
                    }
                })()
            } </div>
            <div className="card-footer"> {
                (() => {
                    if (editState) {
                        return <Form changeEditState={changeEditState}
                            {...props}/>
                }
            })()
            } </div>
        </div>
        <hr/>
    </div>)
}
