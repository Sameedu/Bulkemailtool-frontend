import React from 'react';
import axios from 'axios';
import {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import jwt from 'jsonwebtoken';
import {useNavigate} from 'react-router-dom';
import {useLocation} from 'react-router-dom';



function ViewGroupMembers() {
  const navigate = useNavigate();
  var gid=1
  const [members,setMembers]=useState([]);
  const location=useLocation();
  const [rename,setRename] =useState(location.state)
  const token = localStorage.getItem("token")
  var groupid = rename.name


//GET DATA //
useEffect(()=>{ async function ViewEmailGroupMembers(groupid){
  var decodedToken = jwt.decode(token);
      if(decodedToken.exp * 1000 < Date.now() ){
          navigate('/login');
      } else {
          var response = await axios.get('http://localhost:3002/group/listemailgroupmembers/' + groupid, {
              headers: {
                  "token": token
              }
          });
          console.log(response.data)
          setMembers(response.data);
      }
}
ViewEmailGroupMembers(groupid)
}, [])


  return (
    <div>  
    
      <h1  className="container-fluid"><b>Member Data for {groupid} </b></h1>
      <Link to='/group'>
      <button className="btn btn-info">Back</button> &nbsp; &nbsp;&nbsp; &nbsp;
      </Link> 
      <Link to= '/group/addgroup'> 
        <button className="btn btn-info"> ADD A NEW GROUP</button> 
      </Link>
      <table className="table table-striped table-dark" >
        <thead>
          <tr>
            <td>Id</td>
            <td>Name</td>
            <td>Email-Id</td>
            <td>Actions</td>
            </tr> 
        </thead>
        <tbody >
          {
            members.map((data)=>{
              return< >
                <tr>
                  <td>{gid++}</td> 
                  <td> {data.name}</td> 
                  <td>{data.address}</td> 
                  <td> 
                    <Link to= '/group/editgroup' state={data}> 
                    <button className="btn btn-primary">EDIT</button> &nbsp; &nbsp;
                    </Link>
                    <button className="btn btn-danger" >DELETE</button>
                  </td>
                </tr>
              </>
            })
          } 
          </tbody>
          </table>
    </div>
  )
}
export default ViewGroupMembers;