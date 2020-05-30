import React, {useState, useEffect} from 'react'
import Interview from '../Components/Interview'
import Form from '../Components/Form'
import { useHistory } from "react-router-dom";

export default function InterviewList(props) {
    let history = useHistory();
    if(!props.loggedInStatus){
        history.push("/login");
    }
    const [Interviews, setInterviews] = useState([]);
    const [Users, setUsers] = useState([]);
    // const [createState, setCreateState] = useState(false);
    // this function fetches data and sets initial state
    // right now lets mimic the functionality
    const fetchUsers = () => {
        const nextUsers = Object.assign([], Users);
        const fetchedUsers = [
            {
                id: 1,
                name: "abhay",
                email: "abhay@gmail.com"
            },
            {
                id: 2,
                name: "John",
                email: "johndoe@gmail.com"
            },
            {
                id: 7,
                name: "Chris",
                email: "chrispratt@gmail.com"
            },
            {
                id: 4,
                name: "Johnson",
                email: "mitchy@gmail.com"
            }, {
                id: 3,
                name: "Naman",
                email: "naman@gmail.com"
            }
        ]
        fetchedUsers.forEach((user) => {
            nextUsers.push(user);
        })
        setUsers(nextUsers);
    }
    const fetchInterviewsData = () => {
        const nextInterviews = Object.assign([], Interviews);
        const fetchedData = [
            {
                id: 1,
                title: 'interview-1',
                interviewer: 'prakhar',
                starttime: '2018-06-12T19:30',
                endtime: '2018-06-12T19:30',
                interviewer: {
                    id: 1,
                    name: "abhay",
                    email: "abhay@gmail.com"
                },
                participants: [
                    {
                        id: 2,
                        name: "John",
                        email: "johndoe@gmail.com"
                    }, {
                        id: 7,
                        name: "Chris",
                        email: "chrispratt@gmail.com"
                    }, {
                        id: 4,
                        name: "Johnson",
                        email: "mitchy@gmail.com"
                    }
                ]
            }, {
                id: 2,
                title: 'interview-2',
                interviewer: 'jordan',
                starttime: '2018-06-12T19:30',
                endtime: '2018-06-12T19:30',
                interviewer: {
                    id: 1,
                    name: "abhay",
                    email: "abhay@gmail.com"
                },
                participants: [
                    {
                        id: 3,
                        name: "Naman",
                        email: "naman@gmail.com"
                    }, {
                        id: 7,
                        name: "Chris",
                        email: "chrispratt@gmail.com"
                    }, {
                        id: 5,
                        name: "Johnson",
                        email: "mitchy@gmail.com"
                    }
                ]
            }, {
                id: 3,
                title: 'interview-3',
                interviewer: 'solanki',
                starttime: '2018-06-12T19:30',
                endtime: '2018-06-12T19:30',
                interviewer: {
                    id: 1,
                    name: "abhay",
                    email: "abhay@gmail.com"
                },
                participants: [
                    {
                        id: 2,
                        name: "John",
                        email: "johndoe@gmail.com"
                    }, {
                        id: 7,
                        name: "Chris",
                        email: "chrispratt@gmail.com"
                    }, {
                        id: 3,
                        name: "Naman",
                        email: "naman@gmail.com"
                    }
                ]
            }
        ]
        fetchedData.forEach((interview) => {
            nextInterviews.push(interview);
        })
        setInterviews(nextInterviews);
    };
    useEffect(() => {
        fetchInterviewsData();
        fetchUsers();
    }, [])

    const onDelete = (id) => {
        console.log("id is ", id );
        const nextInterviews = Object.assign([], Interviews);
        const index = Interviews.findIndex(x => x.id === id);
        nextInterviews.splice(index,1);
        setInterviews(nextInterviews);
    }
    const onEdit = (e, interview) => { // yaha pe interview ka naya data aaega aur fir update hoga
        const nextInterviews = Object.assign([], Interviews);
        const index = Interviews.findIndex(x => x.id === interview.id);
        nextInterviews[index] = interview
        setInterviews(nextInterviews);
        e.preventDefault();
    }
    const onCreate = (e, interview) => {
        const nextInterviews = Object.assign([], Interviews);
        nextInterviews.push(interview)
        setInterviews(nextInterviews);
        e.preventDefault();
    }
    return (
        <div className="row">
            <div className="offset-md-3"></div>
            <div className="col-md-6">
                <div> {
                    (() => {
                        if (props.createBox) {
                            return <Form users={Users}
                                changeCreateState={
                                    props.changeStateOfCreateBox
                                }
                                onCreate={onCreate}/>
                        }
                    })()
                }
                    {
                    Interviews.map(interview => {
                        return <Interview {...interview}
                            users={Users}
                            onEdit={onEdit} onDelete={onDelete} />;
                    })
                } </div>
                <div className="offset-md-3"></div>
            </div>
        </div>
    )
}
