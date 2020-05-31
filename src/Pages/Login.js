import React from 'react'
import {postData} from "../Utils"

export default function Login(props) {
    let emailRef = null;
    let passwordRef = null;
    const handleSubmit = async (e)=>{
        const formData = collectFormData();
        console.log("formData is ", formData);
        const data = await postData("http://localhost:4000/auth/login", { user: formData});
        console.log("data is ",data);
        if(data.error){
            document.getElementById("error").innerText = data.error.user_authentication;
            passwordRef.value = "";
        }
        else{
            props.handleLogin(data);
        }
        e.preventDefault();
    }
    const collectFormData = () => {
        let user = {}
        user.email = emailRef.value
        user.password = passwordRef.value
        return user
    }
    return (
        <div className="container mt-5">
        <div className="card bg-light">
            <article className="card-body mx-auto" style={{width: "300px"}}>
                <h4 className="card-title mt-3 text-center">Login to your Account</h4>
                <small id="error" style={{color:"red"}}></small>
                <form className="form-group" name="loginform" >
                    Email <input type="email" name="email" ref={(input) => {emailRef = input}} className="form-control mb-3" placeholder="email" />
                    Password <input type="password" name="password" ref={(input) => {passwordRef = input}} className="form-control mb-3" placeholder="password"  />
                    <button type="button" className="btn btn-primary" onClick={handleSubmit} id="submit">Log In</button>
                </form>
            </article>
        </div> 
        </div>
    )
}
