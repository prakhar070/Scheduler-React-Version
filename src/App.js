import React from 'react';
import {useState, useEffect} from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import InterviewList from './Pages/InterviewList';
import About from './Pages/About';
import Bottombar from './Components/Bottombar'
import Navbar from './Components/Navbar'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import { useHistory } from "react-router-dom";

function App() {
    let history = useHistory();
    const [createBox, setCreateBox] = useState(false);
    const [loggedInStatus, setLoggedInStatus] = useState(false);
    const [currentUser, setCurrentUser] = useState("")

    const changeStateOfCreateBox = () => { // this will change the state
        createBox === true ? setCreateBox(false) : setCreateBox(true);
    }
    const handleLogin = (data) =>{
        setLoggedInStatus(true)
        localStorage.setItem("token", data.access_token);
        setCurrentUser(data.username);
        history.push('/interviews')
    }
    const handleLogout = () => {
        setLoggedInStatus(false)
        setCurrentUser("")
        //clear the token
        localStorage.setItem("token","");
        history.push('/login')
    }
    
    const handleRegister = ()=>{
        alert("user created successfully !")
        history.push('/login')
    }

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
            setCurrentUser(jsondata);
            setLoggedInStatus(true);
        }
    }
    useEffect(() => {
        checkLoginStatus();
    }, [])

    return (
        <div className="App">
            <Navbar changeStateOfCreateBox={changeStateOfCreateBox} handleLogout={handleLogout} loggedInStatus={loggedInStatus} />
            <Switch>
                <Route exact path='/interviews'
                    render={
                        () => <InterviewList createBox={createBox}
                            changeStateOfCreateBox={changeStateOfCreateBox} loggedInStatus={loggedInStatus}/>
                    }/>
                <Route exact path='/about'
                    component={About}/>
                <Route exact path='/login'
                    render={
                        () => <Login handleLogin={handleLogin}/>
                    }/>
                <Route exact path='/signup'
                    render={
                        () => <Signup handleRegister={handleRegister}/>
                    }/>

            </Switch>
        </div>
    );
}

export default App;
