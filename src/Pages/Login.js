import React from 'react'

export default function Login(props) {
    let emailRef = null;
    let passwordRef = null;
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
    const ValidateEmail = (mail)=> {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
            console.log("true returned")
            return true
        }
        return false
    }
    const checkLoginValidations = (data)=>{
        let errors = {}
        console.log(data);
        if(!data.password)
        console.log("passsowr is ",data.password);
        if(data.password && data.password.length < 8){
            errors.password = "Please provide a valid password that is atleast 8 characters long";
        }
        if(data.email && !ValidateEmail(data.email)){
            errors.email = "Please provide a valid email address ";
        }
        return errors;
    }
    const reflectFormErrors = (errors)=>{
        document.getElementById("email").innerText = errors.email ? errors.email : ""
        document.getElementById("password").innerText = errors.password ? errors.password : ""
    }
    const handleSubmit = async (e)=>{
        const formData = getData();
        //I should first check the validations 
        const errors = checkLoginValidations(formData);
        console.log("Errors are ",errors);
        //this prevent page from loading
        if(Object.keys(errors).length === 0){
            const data = await postData("http://localhost:4000/auth/login", formData);
            if(data.error){
                document.getElementById("error").innerText = data.error.user_authentication;
                passwordRef.value = "";
            }
            else{
                props.handleLogin(data);
            }
        }
        else{
            reflectFormErrors(errors);
        }
        e.preventDefault();
    }
    const getData = () => {
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
                    <small id="email" style={{color:"red"}}></small><br />
                    Email <input type="email" name="email" ref={(input) => {emailRef = input}} className="form-control mb-3" placeholder="email" />
                    <small id="password" style={{color:"red"}}></small><br />
                    Password <input type="password" name="password" ref={(input) => {passwordRef = input}} className="form-control mb-3" placeholder="password"  />
                    <button type="button" className="btn btn-primary" onClick={handleSubmit} id="submit">Log In</button>
                </form>
                <p className="text-center">Don't have an account already? <a href="#register">Register</a></p>
            </article>
        </div> 
        </div>
    )
}
