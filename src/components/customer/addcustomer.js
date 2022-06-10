import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useState}from  'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import jwt from 'jsonwebtoken';


function AddCustomer() {
    const initial={
      cust_name:"",
      cust_email:"",
      cust_address:"",
      cust_phone:"",
      cust_purchase_category:""
      }

      const [rename,setRename]=useState(initial)
      const [customers,setCustomers]=useState([]);
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
            var response = await axios.post(
              'http://localhost:3002/customer/create',
              {
                cust_name : rename.cust_name,
                cust_email : rename.cust_email,
                cust_address : rename.cust_address,
                cust_phone : rename.cust_phone,
                cust_purchase_category: rename.cust_purchase_category
              },
            { headers: {
                "token": token  
                }
            });
            setCustomers(response.data);
            setRename({ 
              cust_name:"",
              cust_email:"",
              cust_address:"",
              cust_phone:"",
              cust_purchase_category:""
             })
            navigate('/customer')
          }
      }
      
  return (
    <div className="container" id="addcustomers">
          <h1><b> Add Customer </b></h1>
        <Form>

  <Form.Group className="mb-3">
    <Form.Label>Name</Form.Label>
    <Form.Control type="text" placeholder="Name" name="cust_name"  value={rename.cust_name}  onChange={handleChange}/>
</Form.Group>

<Form.Group className="mb-3">
    <Form.Label>Email</Form.Label>
    <Form.Control type="email"  placeholder="Email" name="cust_email" value={rename.cust_email}  onChange={handleChange} />
    <Form.Text className="text-muted">
    We will never share your email with anyone else.
    </Form.Text>
</Form.Group>

<Form.Group className="mb-3" >
    <Form.Label>Address</Form.Label>
    <Form.Control type="text"  placeholder="Address"  name="cust_address" value={rename.cust_address}  onChange={handleChange}/>
    
</Form.Group>

<Form.Group className="mb-3">
    <Form.Label>Phone</Form.Label>
    <Form.Control type="tel"  name="cust_phone"  value={rename.cust_phone}    onChange={handleChange} />
</Form.Group>

<Form.Group className="mb-3">
    <Form.Label>PurchaseCategory</Form.Label>
    <Form.Control type="text" placeholder="PurchaseCategory (cakes, choclates, Misc)"   name="cust_purchase_category"  value={rename.cust_purchase_category}    onChange={handleChange} />
</Form.Group>

<Button variant="primary" onClick={handleCreate}>
    Submit
</Button>
<br/>

</Form>     
    </div>
  )
}

export default AddCustomer;