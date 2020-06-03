import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../actions/usersActions'


const UsersRedux = ({dispatch})=> {
    useEffect(()=>{
        dispatch(fetchUsers())
    },[])
    
    return (
        <div>
            <h1>Users</h1>
        </div>
    )
}

const mapStateToProps = (state)=>{
    
    return {
        loading: state.users.loading,
        users: state.users.users,
        error: state.users.error
    }
}
export default connect(mapStateToProps)(UsersRedux)
