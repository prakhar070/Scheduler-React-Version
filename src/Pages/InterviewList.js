import React, {useState, useEffect} from 'react'
import Interview from '../Components/Interview'
import Form from '../Components/Form'
import {useHistory} from "react-router-dom";
import {checkLoginStatus} from "../AuthUtils"
import {getData, deleteData} from "../Utils"
import {fetchUsers} from '../actions/usersActions'
import {fetchInterviews} from '../actions/interviewsActions'
import {connect} from 'react-redux'
import LoadingSpinner from '../Components/LoadingSpinner'
import PopUp from '../Components/PopUp'
import Filter from '../Components/Filter'


const mapStateToProps = (state) => {
    console.log("map state to props ");
    return {
        loading: state.users.loading || state.interviews.loading,
        users: state.users.users,
        interviews: state.interviews.interviews,
        errorUsers: state.users.error,
        errorInterviews: state.interviews.error,
        interview: state.interviews.interview,
        categories: state.interviews.categories
    }
}

const mapDispatchToProps = dispatch => {
    console.log("map dispatch to props ");
    return {
        fetchUsers: () => dispatch(fetchUsers()),
        fetchInterviews: () => dispatch(fetchInterviews())
    }
}

const InterviewList = (props) => {
    let history = useHistory();

    useEffect(() => {
        checkLoginStatus().then((res) => {
            if (res) {
                props.fetchInterviews()
                props.fetchUsers()
            } else {
                history.push("/login");
            }
        })
    }, [])

    const onDelete = async (id) => {
        var result = window.confirm("Want to delete?");
        if (result) { // Logic to delete the item
            const res = await deleteData(`http://localhost:4000/interviews/${id}`);
            if (res.message) {
                alert("interview deleted successfully !")
            }
            props.fetchInterviews();
        }
    }
    const handleSuccessfullCreateEdit = () => {
        props.fetchInterviews();
    }

    let message = (<div className="message"></div>);
    let page;


    if (!props.loading) {
        page = (<div className="row">
            <div className="offset-md-3"></div>
            <div className="col-md-6">
                <Filter/>
                <div class="mt-3" id="userError"></div>
                <div> {
                    (() => {
                        console.log("rendering")
                        if (props.createBox) {
                            return <Form users={
                                    props.users.users
                                }
                                changeCreateState={
                                    props.changeStateOfCreateBox
                                }
                                handleSuccessfullCreateEdit={handleSuccessfullCreateEdit}/>
                        }
                    })()
                }
                    {
                    props.interviews.map(interview => {
                        return <Interview {...interview.interview}
                            users={
                                props.users.users
                            }
                            handleSuccessfullCreateEdit={handleSuccessfullCreateEdit}
                            onDelete={onDelete}/>;
                    })
                } </div>
                <div className="offset-md-3"></div>
            </div>
        </div>)
    } else {
        page = <LoadingSpinner/>
    }
    return (<> {message}
        {page} </>)
}
export default connect(mapStateToProps, mapDispatchToProps)(InterviewList)
