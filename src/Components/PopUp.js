import React , {useState, useEffect} from 'react'
import {Row,Col,Toast, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

function PopUp(props) {
    const [showA, setShowA] = useState(true);
  
    const toggleShowA = () => setShowA(!showA);
  
    return (
          <Toast show={showA} onClose={toggleShowA}>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded mr-2"
                alt=""
              />
              <strong className="mr-auto">Interview Scheduler</strong>
            </Toast.Header>
            <Toast.Body>{props.message}</Toast.Body>
          </Toast>
    );
  }
  

export default PopUp
