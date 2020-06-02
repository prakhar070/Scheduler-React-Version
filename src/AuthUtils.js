const hasNumber = (string)=>{
    return /\d/.test(string);
}

const ValidateEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return true
    }
    return false
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
    if(document.getElementById("name") && errors.name)
        document.getElementById("name").innerText = errors.name
    if(document.getElementById("email") && errors.email)
        document.getElementById("email").innerText = errors.email
    if(document.getElementById("password") && errors.password)
        document.getElementById("password").innerText = errors.password 
    if(document.getElementById("title") && errors.title)
        document.getElementById("title").innerText = errors.title 
    if(document.getElementById("starttime") && errors.starttime)
        document.getElementById("starttime").innerText = errors.starttime
    if(document.getElementById("endtime") && errors.endtime)
        document.getElementById("endtime").innerText = errors.endtime 
    if(document.getElementById("interviewer") && errors.interviewer)
        document.getElementById("interviewer").innerText = errors.interviewer 
    if(document.getElementById("participants") && errors.participants)
        document.getElementById("participants").innerText = errors.participants
}


//a ulitily function to check if the user is loggedin of not, returns true if logged in else false
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
    if(jsondata.id){
        return true;
    }
    return false;
}

export {checkLoginStatus, checkSignupValidations, reflectFormErrors}