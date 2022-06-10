import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useState}from  'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import jwt from 'jsonwebtoken';
import {Link} from 'react-router-dom';


function AddGroupMembers() {
    const initial={
      mgroup_name:"",
      mgroup_description:"",
      }

      const [rename,setRename]=useState(initial)
      const [groups,setGroups]=useState([]);
      const navigate=useNavigate()
      const token = localStorage.getItem("token")

      const handleChange=(e)=>{   
            e.preventDefault(); 
            setRename({...rename, [e.target.name]: e.target.value})
         }
      
      const handleCreate = async () => {
          var decodedToken = jwt.decode(token);
          if(decodedToken.exp * 1000 < Date.now() ){
              navigate('/login');
          } else {
            var response = await axios.post('http://localhost:3002/group/addmemebers/' + groupid,
              {
                mgroup_name : rename.mgroup_name,
                mgroup_description : rename.mgroup_description,
              },
            { headers: {
                "token": token  
                }
            });
            setGroups(response.data);
            setRename({ 
              mgroup_name:"",
              mgroup_description:"",
             })
            navigate('/group')
          }
      }
      
  return (
    <div className="container" id="addgroups">
      <h3><b> Add Group </b></h3>
      <br/>
      <Link to='/group'>
      <button className="btn btn-info">Back</button>
      </Link> 
      <br/>
      <br/>

        <Form>
            <Form.Group className="mb-3">
              <Form.Label>Mail Group Name</Form.Label>
              <Form.Control type="text" placeholder="Enter the name of the new mail group" name="mgroup_name"  value={rename.mgroup_name}  onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Description</Form.Label>
                <Form.Control type="text"  placeholder="A small description to identify the group represents which set of customers"  name="mgroup_description" value={rename.mgroup_description}  onChange={handleChange}/>
            </Form.Group>

            <Button variant="primary" onClick={handleCreate}>
                Submit
            </Button>
        </Form>     
    </div>
  )
}

export default AddGroupMembers;