import React from 'react';
import {useState, useEffect} from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import InterviewList from './Pages/InterviewList';
import About from './Pages/About';
import Navbar from './Components/Navbar'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import {useHistory } from "react-router-dom";
import {checkLoginStatus} from "./AuthUtils"
import UsersRedux from './Components/UsersRedux';


function App() {
    let history = useHistory();
    const [createBox, setCreateBox] = useState(false);
    const [loggedInStatus, setLoggedInStatus] = useState(false);
    
    const changeStateOfCreateBox = () => { // this will change the state
        createBox === true ? setCreateBox(false) : setCreateBox(true);
    }
    const handleLogin = (data) =>{
        setLoggedInStatus(true)
        localStorage.setItem("token", data.access_token);
        alert("logged-In successdfully");
        history.push('/interviews')
    }
    const handleLogout = () => {
        setLoggedInStatus(false)
        //clear the token
        localStorage.setItem("token","");
        history.push('/login')
    }
    
    // a function that handles successfull registration
    const handleRegister = ()=>{
        alert("user created successfully !")
        //redirect user to the login page
        history.push('/login')
    }

    useEffect(() => {
        checkLoginStatus().then((res)=>{
            if(res) setLoggedInStatus(true);
            else setLoggedInStatus(false);
        })
    }, [])

    return (
        
        <div className="App">
            <Navbar changeStateOfCreateBox={changeStateOfCreateBox} handleLogout={handleLogout} loggedInStatus={loggedInStatus} />
            <UsersRedux />
            <Switch>
                <Route exact path='/interviews'
                    render={
                        () => <InterviewList createBox={createBox}
                            changeStateOfCreateBox={changeStateOfCreateBox} />
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
