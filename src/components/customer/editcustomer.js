import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useLocation} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import jwt from 'jsonwebtoken';


function EditCustomer() {
 
  const location=useLocation();
  const [rename,setRename]=useState(location.state)
  const [customers,setCustomers]=useState([]);
  const navigate=useNavigate();
  const token = localStorage.getItem("token")
  var id = rename._id

  const handleUpdate = async (id) => { 
    var decodedToken = jwt.decode(token);
    if(decodedToken.exp * 1000 < Date.now() ){
        navigate('/login');
    } else {
      console.log(id)
      var response = await axios.put(
      `http://localhost:3002/customer/update/${id}`, 
      {
        cust_email : rename.cust_email,
        cust_address : rename.cust_address,
        cust_phone : rename.cust_phone,
        cust_purchase_category: rename.cust_purchase_category
      },
      { headers: {
        "token": token  
      }
    }
    );
  
    console.log(response.data)
    setCustomers(response.data);
    navigate('/customers');
    }
    //setcustomers({firstname: '', lastname:'', email: '', id: '' });
    // // console.log(this.state.user);
  };
  


  return (
    <div>
      <h1>UPDATE Customers</h1>
      
       <div id="addcustomers">
         <Form>
         <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="email" placeholder="Enter customer name" value={rename.cust_name} name="cust_name" onChange={(e)=>setRename({...rename,cust_name:e.target.value})} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter customer E-mail" value={rename.cust_email} name="cust_email" onChange={(e)=>setRename({...rename,cust_email:e.target.value})} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" placeholder="Enter customer address" name="cust_address"  value={rename.cust_address} onChange={(e)=>setRename({...rename,cust_address:e.target.value})}  />

        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Phone</Form.Label>
          <Form.Control type="tel" placeholder=" Enter customer phone number" name="cust_phone" value={rename.cust_phone} onChange={(e)=>setRename({...rename,cust_phone:e.target.value})} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>PurchaseCategory</Form.Label>
          <Form.Control type="text" name="cust_purchase_category" value={rename.cust_purchase_category}  placeholder="Enter purchase category (cakes/choclates/misc)" onChange={(e)=>setRename({...rename,cust_purchase_category:e.target.value})} />
        </Form.Group>

        <Button variant="primary" onClick={()=>handleUpdate(rename.id)} >
          Submit
        </Button>

      </Form>
      </div>
    </div>
  )
}

export default EditCustomer;