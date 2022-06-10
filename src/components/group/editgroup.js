import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useLocation} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import jwt from 'jsonwebtoken';


function EditGroup() {
 
  const location=useLocation();
  const [rename,setRename]=useState(location.state)
  const [groups,setGroups]=useState([]);
  const navigate=useNavigate();
  const token = localStorage.getItem("token")

  const handleUpdate = async (id) => { 
    var decodedToken = jwt.decode(token);
    if(decodedToken.exp * 1000 < Date.now() ){
        navigate('/login');
    } else {
      console.log(id)
      var response = await axios.put(
      `http://localhost:3002/group/update/${id}`, 
      {
        group_list : rename.group_list,
        group_description : rename.group_description
      },
      { headers: {
        "token": token  
      }
    }
    );
  
    console.log(response.data)
    setGroups(response.data);
    navigate('/group');
    }
    //setcustomers({firstname: '', lastname:'', email: '', id: '' });
    // // console.log(this.state.user);
  };
  


  return (
    <div>
      <h1>Update Group {rename.group_name} </h1>
      
       <div id="addgroups">
         <Form>
         <Form.Group className="mb-3">
          <Form.Label>Email-Id list</Form.Label>
          <Form.Control type="email" placeholder="Email" value={rename.group_list} name="group_list" onChange={(e)=>setRename({...rename,group_list:e.target.value})} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control type="email" placeholder="Enter customer E-mail" value={rename.group_description} name="group_description" onChange={(e)=>setRename({...rename,group_description:e.target.value})} />
        </Form.Group>

        <Button variant="primary" onClick={()=>handleUpdate(rename.id)} >
          Submit
        </Button>

      </Form>
      </div>
    </div>
  )
}

export default EditGroup;