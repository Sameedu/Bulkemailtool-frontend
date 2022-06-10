import React from 'react';
import axios from 'axios';
import {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import jwt from 'jsonwebtoken';
import {useNavigate} from 'react-router-dom';


function DashboardCustomer() {
  const navigate = useNavigate();
  var id=1
  const [customers,setCustomers]=useState([]);
  const token = localStorage.getItem("token")


//GET DATA //
  useEffect(()=>{ async function getdata(){
    var decodedToken = jwt.decode(token);
    if(decodedToken.exp * 1000 < Date.now() ){
        navigate('/login');
    } else {
        var response = await axios.get('http://localhost:3002/customer/get', {
            headers: {
                "token": token
            }
        });
        console.log(response.data)
        setCustomers(response.data);
    }
}
getdata()
}, [])

    //DELETE
  const handleDelete=async(id)=>{
    var decodedToken = jwt.decode(token);
    if(decodedToken.exp * 1000 < Date.now() ){
        navigate('/');
    } else {
        await axios.delete('http://localhost:3002/customer/delete/${id}', {
            headers: {
                "token": token
            }
        });
        var user = customers.filter((user) => user.id !== id);
        console.log(user)
        setCustomers(user);
    }
}

  return (
    <>
    <div>  
    
      <h3  className="container-fluid"><b>CUSTOMER DASHBOARD</b></h3>
      <Link to='/dashboard'>
      <button className="btn btn-info">Back</button>  &nbsp; &nbsp;&nbsp; &nbsp;
      </Link> 
      <Link to= '/customer/addcustomer'> 
        <button className="btn btn-info"> ADD A NEW CUSTOMER</button> 
      </Link>
      <table className="table table-striped table-dark" >
        <thead>
          <tr>
            <td>Id</td>
            <td>Name</td>
            <td>Email</td>
            <td>Address</td>
            <td>Phone</td>
            <td>CreatedDate</td>
            <td>PurchaseCategory</td>
            <td>Actions</td>
            </tr> 
        </thead>
        <tbody >
          {
            customers.map((data)=>{
              return< >
                <tr key={data._id}>
                  <td>{id++}</td> 
                  <td> {data.cust_name}</td> 
                  <td>{data.cust_email}</td> 
                  <td>{data.cust_address}</td> 
                  <td>{data.cust_phone}</td>
                  <td>{data.cust_createdate}</td> 
                  <td>{data.cust_purchase_category}</td> 
                  <td> 
                    <Link to= '/customer/editcustomer' state={data}> 
                    <button className="btn btn-primary">EDIT</button> &nbsp; &nbsp;
                    </Link>
                    <button className="btn btn-danger" onClick={()=>handleDelete(data.id)}>DELETE</button>
                  </td>
                </tr>
              </>
            })
          } 
          </tbody>
          </table>
    </div>
    </>
  )
}

export default DashboardCustomer;