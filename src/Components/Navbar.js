import React from 'react'
import {Link} from 'react-router-dom';

export default function Navbar(props) {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <ul className="navbar-nav mr-auto">
                  <li><Link to={'/interviews'} className="nav-link">Interviews</Link></li>
                  <li className="nav-link" onClick={props.changeStateOfCreateBox}>Create</li>
                  <li><Link to={'/about'} className="nav-link">About</Link></li>
                </ul>
                  {
                   (()=>{ if(props.loggedInStatus){
                      return(
                        <ul className="navbar-nav">
                          <li className="nav-link" onClick={props.handleLogout}>Logout</li>
                        </ul>
                      )
                    }
                    else{
                      return(
                        <ul className="navbar-nav">
                          <li><Link to={'/login'} className="nav-link">Login</Link></li>
                          <li><Link to={'/signup'} className="nav-link">Signup</Link></li>
                        </ul>
                      )
                    }
                  })()
                }
            </nav>
        </div>
    )
}
