import React from 'react'
import {useState} from 'react'
import Form from './Form'

export default function Interview(props) {
    const [editState, setEditState] = useState(false)
    const [detailState, setDetailState] = useState(false)
    const [detailText, setDetailText] = useState("View Details")

    const changeDetailState = () => {
        if (!detailState) {
            setDetailState(true)
            setDetailText("View Less")
        }
         else{
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
    return (
        <div>
            <div className="card mt-4">
                <div className="card-header">
                    <h4>{
                        props.title
                    }</h4>
                    <i class="fa fa-clock-o ml-4 mr-1" aria-hidden="true"></i>
                    {
                    props.starttime
                }
                    - {
                    props.endtime
                }
                    <a className="card-link" onClick={changeDetailState}
                        style={
                            {float: "right"}
                        }>{detailText}</a>
                </div>
                <div className="card-body">
                    {
                    (() => {
                        if (detailState) {
                            return (
                                <div className="card"
                                    style={
                                        {width: "auto"}
                                }>
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            {
                                            props.interviewer.name
                                        }
                                            <small className="text-muted">(Interviewer)</small>
                                        </h5>
                                        <h6 className="card-subtitle mb-2 text-muted">
                                            {
                                            props.interviewer.email
                                        }</h6>
                                        <p className="card-text">
                                            Participants
                                            <table className="table table-hover table-dark mt-2">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Email</th>
                                                    </tr>
                                                </thead>
                                                <tbody> {
                                                    props.participants.map((participant) => {
                                                        return (
                                                            <tr>
                                                                <td>{
                                                                    participant.name
                                                                }</td>
                                                                <td>{
                                                                    participant.email
                                                                }</td>
                                                            </tr>
                                                        )
                                                    })
                                                } </tbody>
                                            </table>
                                        </p>
                                        <i class="fa fa-pencil-square-o mx-1" aria-hidden="true"></i>
                                        <a className="card-link"
                                            onClick={changeEditState}>Edit</a>
                                        <a className="card-link" onClick={props.onDelete.bind(this,props.id)} >Delete</a>
                                        <i class="fa fa-trash ml-8 mr-1" aria-hidden="true"></i>
                                    </div>
                                </div>
                            )
                        }
                    })()
                } </div>
                <div className="card-footer">
                    {
                    (() => {
                        if (editState) {
                            return <Form changeEditState={changeEditState}
                                {...props}/>
                    }
                })()
                } </div>
            </div>
            <hr/>
        </div>
    )
}
