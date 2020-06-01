import React, {useState, useEffect} from 'react'
import Interview from '../Components/Interview'
import Form from '../Components/Form'
import { useHistory } from "react-router-dom";
import {checkLoginStatus} from "../AuthUtils"
import { getData, deleteData} from "../Utils"
import {fetchUsers} from '../actions/usersActions'
import {fetchInterviews} from '../actions/interviewsActions'
import {connect} from 'react-redux'

const mapStateToProps = (state)=>{
    console.log("map state to props ");
    return {
        loading: state.users.loading,
        users: state.users.users,
        interviews: state.interviews.interviews,
        errorUsers: state.users.error,
        errorInterviews: state.interviews.error
    }
}

const mapDispatchToProps = dispatch =>{
    console.log("map dispatch to props ");
    return {
        fetchUsers: ()=> dispatch(fetchUsers()),
        fetchInterviews: ()=> dispatch(fetchInterviews())
    }
}

const InterviewList = (props)=> {
    console.log("inside component");
    let history = useHistory();
    //const [Interviews, setInterviews] = useState([]);
    // const [Users, setUsers] = useState([]);

    // const fetchUsers = async () => {
    //     const nextUsers = Object.assign([], Users);
    //     let fetchedUsers = await getData("http://localhost:4000/users"); 
    //     fetchedUsers = fetchedUsers.users;
    //     fetchedUsers.forEach((user) => {
    //         nextUsers.push(user);
    //     })
    //     setUsers(nextUsers);
    // }
    const mapp = (interviews) => {
        const promises = interviews.map(async (interview) => {
            const interviewData = await getData(`http://localhost:4000/interviews/${interview.id}`);
            return interviewData;
        });
        return Promise.all(promises);
    }

    // const fetchInterviewsData = async() => {
    //     const nextInterviews = [];
    //     let interviews = await getData("http://localhost:4000/interviews");
    //     interviews = interviews.interviews.organized.concat(interviews.interviews.participated).concat(interviews.interviews.interviewed);
    //     const fetchedData = await mapp(interviews);
    //     fetchedData.forEach((interview) => {
    //         nextInterviews.push(interview);
    //     })
    //     console.log("fetched interviews are ",nextInterviews);
    //     setInterviews(nextInterviews);
    // };

    useEffect(()=> {
        console.log("inside use effect");
        checkLoginStatus().then((res)=>{
            if(res){
                //fetchInterviewsData();
                // fetchUsers();
                props.fetchInterviews()
                props.fetchUsers()
            }
            else{
                history.push("/login");
            }
        })
    }, [])

    const onDelete = async (id) => {
        var result = window.confirm("Want to delete?");
        if (result) {
            //Logic to delete the item 
            const res = await deleteData(`http://localhost:4000/interviews/${id}`);
            if(res.message){
                alert("interview deleted successfully !")
            }
            //fetchInterviewsData();
            props.fetchInterviews();
        }
    }
    const handleSuccessfullCreateEdit = ()=>{
        // fetchInterviewsData();
        props.fetchInterviews();
    }



    return (
        <div className="row">
            <div className="offset-md-3"></div>
            <div className="col-md-6">
                <div class="mt-3" id="userError"></div>
                <div> {
                    (() => {
                        if (props.createBox) {
                            return <Form users={props.users.users}
                                changeCreateState={
                                    props.changeStateOfCreateBox
                                }
                                handleSuccessfullCreateEdit={handleSuccessfullCreateEdit}/>
                        }
                    })()
                }
                    {
                    // Interviews.map(interview => {
                    //     return <Interview {...interview.interview}
                    //         users={props.users.users}
                    //         handleSuccessfullCreateEdit={handleSuccessfullCreateEdit} onDelete={onDelete} />;
                    // })
                    props.interviews.map(interview => {
                        return <Interview {...interview.interview}
                            users={props.users.users}
                            handleSuccessfullCreateEdit={handleSuccessfullCreateEdit} onDelete={onDelete} />;
                    })
                } 
                
                </div>
                <div className="offset-md-3"></div>
            </div>
        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(InterviewList)
