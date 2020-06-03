import moment from 'moment'

// a utiltiy function to get data from a given URL
const getData = async (url = '') => {
    const response = await fetch(url, {
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
    return jsondata;
}


// a utility function to post data to a specific URL
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
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
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    const jsondata = await response.json();
    return jsondata;
}


// a utility function to post data to a specific URL
const postResumeData = async (url = '', data) => {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Authorization': `Bearer ${
                localStorage.getItem("token")
            }`
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: data
    });
    const jsondata = await response.json();
    return jsondata;
}


// a utlity function to delete a resource present at a URL
const deleteData = async (url = '') => {
    const response = await fetch(url, {
        method: 'DELETE',
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
    return jsondata;
}

// a utility function to update a resource at a URL
const putData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'PUT',
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
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    const jsondata = await response.json();
    return jsondata;
}


// convert UTC datetime string to local datetime
const utcToLocal = (datetime) => {
    let localvalue = moment.utc(datetime).local().format();
    localvalue = localvalue.substr(0, localvalue.indexOf("+"));
    return localvalue
}

// convert local datetime string to UTC datetime string
const localToUtc = (datetime) => {
    return new Date(datetime).toUTCString()
}


const checkInterviewValidations = ({
    title,
    starttime,
    endtime,
    interviewer,
    participants
}) => {
    const errors = {}
    if (title === "") 
        errors.title = "please provide a title"

    

    if (endtime === "") 
        errors.endtime = "please provide an end time"

    

    if (starttime === "") 
        errors.starttime = "please provide a start time"

    

    if (!interviewer) 
        errors.interviewer = "please select an interviewer"

    

    if (starttime !== "" && new Date(starttime) <= new Date()) 
        errors.starttime = "this ain't a time machine!!"

    

    if (title !== "" && title.length < 3) 
        errors.title = "provide a valid title with minimum length of 3";
    

    if (new Date(starttime) >= new Date(endtime)) 
        errors.starttime = "starttime must be less than endtime";
    

    if (participants.length == 0) 
        errors.participants = "atleast one participant must be selected";
    

    return errors;
}


export {
    postData,
    getData,
    putData,
    deleteData,
    utcToLocal,
    localToUtc,
    checkInterviewValidations,
    postResumeData
}
