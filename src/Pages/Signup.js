import React from 'react'

export default function Signup(props) {
    let nameRef = null;
    let emailRef = null;
    let passwordRef = null;
    let confirmpasswordRef = null;

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
          body: JSON.stringify({user:data})
        });
        const jsondata = await response.json();
        return jsondata;
    }

    function hasNumber(string) {
        return /\d/.test(string);
    }

    const ValidateEmail = (mail)=> {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
            console.log("true returned")
            return true
        }
        return false
    }

    const getData = () => {
        let user = {}
        user.name = nameRef.value
        user.email = emailRef.value
        user.password = passwordRef.value
        user.password_confirmation = confirmpasswordRef.value
        console.log("registered data is ", user);
        return user
    }
    const checkSignupValidations = (data)=>{
        let errors = {}
        
        if(data.password && data.password.length < 8){
            errors.password = "Please provide a valid password that is atleast 8 characters long";
        }
        if(data.email && !ValidateEmail(data.email)){
            errors.email = "Please provide a valid email address ";
        }
        if(data.name && (data.name.length < 2 || hasNumber(data.name) )){
            errors.name = "Please provide a valid string for name that is atleast 2 characters long and must not contain numbers";
        }
        if(data.password && data.password_confirmation && data.password_confirmation !== data.password){
            errors.password = "does not match with confirmed value";
        }
        return errors;
    }
    const reflectFormErrors = (errors)=>{
        document.getElementById("name").innerText = errors.name? errors.name : ""
        document.getElementById("email").innerText = errors.email ? errors.email : ""
        document.getElementById("password").innerText = errors.password ? errors.password : ""
    }
    const handleSubmit = async (e)=>{
        const formData = getData();
        console.log("form data is ",formData);
        const errors = checkSignupValidations(formData);
        console.log("Errors are ",errors);
        if(Object.keys(errors).length === 0){
            const data = await postData("http://localhost:4000/auth/register", formData);
            console.log("data received is ", data);
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
                <p className="text-center">Have an account? <a href="#login">login</a></p>
            </article>
        </div> 
        </div>
    )
}
