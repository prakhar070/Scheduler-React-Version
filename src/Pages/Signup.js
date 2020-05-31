import React from 'react';
import {checkSignupValidations, reflectFormErrors} from "../AuthUtils";
import {postData} from "../Utils";

export default function Signup(props) {
    let nameRef = null;
    let emailRef = null;
    let passwordRef = null;
    let confirmpasswordRef = null;

    const collectFormData = () => {
        let user = {}
        user.name = nameRef.value
        user.email = emailRef.value
        user.password = passwordRef.value
        user.password_confirmation = confirmpasswordRef.value
        return user
    }
    const handleSubmit = async (e)=>{
        const formData = collectFormData();
        const errors = checkSignupValidations(formData);
        //if there are no validation error, we make a post request
        if(Object.keys(errors).length === 0){
            const data = await postData("http://localhost:4000/auth/register",{user: formData});
            if(data.error){
                reflectFormErrors(data.error);
                passwordRef.value = "";
                confirmpasswordRef.value = "";
            }
            else{
                props.handleRegister();
            }
        }
        else{
            reflectFormErrors(errors);
        }
        e.preventDefault();
    }

    return (
        <div className="container mt-5">
        <div className="card bg-light">
            <article className="card-body mx-auto" style={{width: "400px"}}>
                <h4 className="card-title mt-3 text-center">Create Account</h4>
                <p className="text-center">Get started with your free account</p>
                <form className="form-group" name="registerform" >
                    <small id="name" style={{color:"red"}}></small><br />
                    Name <small className="error" id="name"></small><br/> <input type="text" className="form-control mb-3" name="name" ref={(input) => {nameRef = input}} placeholder="name" />
                    <small id="email" style={{color:"red"}}></small><br />
                    Email <small className="error" id="email"></small><br/><input type="email" name="email" className="form-control mb-3" ref={(input) => {emailRef = input}} placeholder="email" />
                    <small id="password" style={{color:"red"}}></small><br />
                    Password <small className="error" id="password"></small><br/><input type="password" name="password" className="form-control mb-3" ref={(input) => {passwordRef = input}} placeholder="password" />
                    <small id="password_confirmation" style={{color:"red"}}></small><br />
                    Confirm Password <small className="error" id="password_confirmation"></small><br/><input type="password" name="password_confirmation" className="form-control mb-3" ref={(input) => {confirmpasswordRef = input}} placeholder="retype password" />
                    <button type="button" className="btn btn-primary" onClick={handleSubmit} id="submit" >Sign Up</button>
                </form>
            </article>
        </div> 
        </div>
    )
}
