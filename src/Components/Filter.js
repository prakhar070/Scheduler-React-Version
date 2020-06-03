import React, {useState, useEffect} from 'react'
import {fetchInterviews} from '../actions/interviewsActions'
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
    return {categories: state.interviews.categories}
}


const mapDispatchToProps = dispatch => {
    return {
        fetchInterviews: (categories) => dispatch(fetchInterviews(categories))
    }
}


function Filter(props) {


    useEffect(() => {
        console.log("categories are ", props.categories);
        if (props.categories.includes("participated")) 
            document.getElementById("participated").checked = true;
         else 
            document.getElementById("participated").checked = false;
        
        if (props.categories.includes("interviewed")) 
            document.getElementById("interviewed").checked = true;
         else 
            document.getElementById("interviewed").checked = false;
        
        if (props.categories.includes("organized")) 
            document.getElementById("organized").checked = true;
         else 
            document.getElementById("organized").checked = false;
        

    }, [props.categories])

    const changeCategories = (e) => {
        let nextCategories = Object.assign([], props.categories);
        if (nextCategories.includes(e.target.value)) {
            nextCategories.splice(nextCategories.indexOf(e.target.value), 1)
        } else {
            nextCategories.push(e.target.value);
        }
        // props.changeCategories(nextCategories);
        props.fetchInterviews(nextCategories);
        // here I will have to dispatch an action that will change the categories in the state of the interviews reducer
    }


    return (<div class="mt-3">
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="organized" value="organized" onClick ={changeCategories}/>
            <label class="form-check-label" for="inlineCheckbox1">As Organizer</label>
        </div>
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="interviewed" value="interviewed" onClick ={changeCategories}/>
            <label class="form-check-label" for="inlineCheckbox2">As Interviewer</label>
        </div>
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="participated" value="participated" onClick ={changeCategories}/>
            <label class="form-check-label" for="inlineCheckbox3">As Participant</label>
        </div>
    </div>)
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
