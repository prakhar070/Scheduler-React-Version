import React, {useState, useEffect} from 'react'
import Interview from '../Components/Interview'
import Form from '../Components/Form'
import { useHistory } from "react-router-dom";

export default function InterviewList(props) {
    let history = useHistory();
    const [Interviews, setInterviews] = useState([]);
    const [Users, setUsers] = useState([]);

    const checkLoginStatus = async (url = '') => {
        const response = await fetch('http://localhost:4000/loggedIn', {
            method: 'GET',
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
            referrerPolicy: 'no-referrer'
        });
        const jsondata = await response.json();
        console.log(jsondata);
        if(jsondata.id){
            return true;
        }
        return false;
    }

    const getData = async(url = '')=> {
        const response = await fetch(url, {
          method: 'GET',
          mode: 'cors',       
          cache: 'no-cache', 
          credentials: 'same-origin', 
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          },
          redirect: 'follow', 
          referrerPolicy: 'no-referrer'
        });
        const jsondata = await response.json();
        return jsondata;
    }
    const postData = async(url = '', data = {})=> {
        const response = await fetch(url, {
          method: 'POST',
          mode: 'cors',       
          cache: 'no-cache', 
          credentials: 'same-origin', 
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          },
          redirect: 'follow', 
          referrerPolicy: 'no-referrer', 
          body: JSON.stringify(data)
        });
        const jsondata = await response.json();
        return jsondata;
    }
    const deleteData = async(url = '')=> {
        const response = await fetch(url, {
          method: 'DELETE',
          mode: 'cors',       
          cache: 'no-cache', 
          credentials: 'same-origin', 
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          },
          redirect: 'follow', 
          referrerPolicy: 'no-referrer', 
        });
        const jsondata = await response.json();
        return jsondata;
    }
    // const [createState, setCreateState] = useState(false);
    // this function fetches data and sets initial state
    // right now lets mimic the functionality
    const fetchUsers = async () => {
        const nextUsers = Object.assign([], Users);
        let fetchedUsers = await getData("http://localhost:4000/users"); 
        fetchedUsers = fetchedUsers.users;
        fetchedUsers.forEach((user) => {
            nextUsers.push(user);
        })
        setUsers(nextUsers);
    }
    const mapp = (interviews) => {
        const promises = interviews.map(async (interview) => {
            const interviewData = await getData(`http://localhost:4000/interviews/${interview.id}`);
            return interviewData;
        });
        return Promise.all(promises);
    }
    const fetchInterviewsData = async() => {
        const nextInterviews = [];
        let interviews = await getData("http://localhost:4000/interviews");
        interviews = interviews.interviews.organized.concat(interviews.interviews.participated).concat(interviews.interviews.interviewed);
        const fetchedData = await mapp(interviews);
        fetchedData.forEach((interview) => {
            nextInterviews.push(interview);
        })
        console.log("next interviews are ", nextInterviews);
        setInterviews(nextInterviews);
    };
    useEffect( () => {
        checkLoginStatus().then((res)=>{
            if(res){
                fetchInterviewsData();
                fetchUsers();
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
            fetchInterviewsData();
        }
    }
    const handleSuccessfullCreateEdit = ()=>{
        fetchInterviewsData();
    }
    return (
        <div className="row">
            <div className="offset-md-3"></div>
            <div className="col-md-6">
                <div class="mt-3" id="userError"></div>
                <div> {
                    (() => {
                        if (props.createBox) {
                            return <Form users={Users}
                                changeCreateState={
                                    props.changeStateOfCreateBox
                                }
                                handleSuccessfullCreateEdit={handleSuccessfullCreateEdit}/>
                        }
                    })()
                }
                    {
                    Interviews.map(interview => {
                        return <Interview {...interview.interview}
                            users={Users}
                            handleSuccessfullCreateEdit={handleSuccessfullCreateEdit} onDelete={onDelete} />;
                    })
                } </div>
                <div className="offset-md-3"></div>
            </div>
        </div>
    )
}
