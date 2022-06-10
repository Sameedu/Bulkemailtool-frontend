import React from 'react';
import axios from 'axios';
import {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import jwt from 'jsonwebtoken';
import {useNavigate} from 'react-router-dom';


function ListMailGroup() {
  const navigate = useNavigate();
  var gid=1
  const [groups,setGroups]=useState([]);
  const token = localStorage.getItem("token")



//GET DATA //
  useEffect(()=>{ async function getdata(){
    var decodedToken = jwt.decode(token);
        if(decodedToken.exp * 1000 < Date.now() ){
            navigate('/login');
        } else {
            var response = await axios.get('http://localhost:3002/group/listmailgroup', {
                headers: {
                    "token": token
                }
            });
            console.log(response.data)
            setGroups(response.data);
        }
  }
getdata()
}, [])

    //DELETE
  const handleDelete=async(id)=>{
    var decodedToken = jwt.decode(token);
    if(decodedToken.exp * 1000 < Date.now() ){
        navigate('/login');
    } else {
        await axios.delete('http://localhost:3002/group/delete/${id}', {
            headers: {
                "token": token
            }
        });
        var user = groups.filter((user) => user.id !== id);
        console.log(user)
        setGroups(user);
    }
}


  return (
    <div>  
    
      <h3  className="container-fluid"><b>E-MAIL GROUP DASHBOARD</b></h3>
      <Link to='/dashboard'>
      <button className="btn btn-info">Back</button> &nbsp; &nbsp;&nbsp; &nbsp;
      </Link> 
      <Link to= '/group/addgroup'> 
        <button className="btn btn-info"> Add New E-Mail Group</button> 
      </Link>
      <br />
      <hr />
      <br />
      
      <table className="table table-striped table-dark" >
        <thead>
          <tr>
            <td>Id</td>
            <td>MailGroup Name</td>
            <td>address</td>
            <td>members_count</td>
            <td>CreatedDate</td>
            <td>Description</td>
            </tr> 
        </thead>
        <tbody >
          {
            groups.map((data)=>{
              return< >
                <tr key={data._id}>
                  <td>{gid++}</td> 
                  <td>{data.name}</td>
                  <td>{data.address}</td> 
                  <td> <Link to= '/group/viewgroupmembers' state={data}> 
                    <button className="btn btn-primary">{data.members_count}</button> &nbsp; &nbsp;
                    </Link></td>
                  <td>{data.created_at}</td> 
                  <td>{data.description}</td>
                  <td> 
                    <Link to= '/group/editgroup' state={data}> 
                    <button className="btn btn-primary">EDIT</button> &nbsp; &nbsp;
                    </Link>
                    <button className="btn btn-danger" onClick={()=>handleDelete(data._id)}>DELETE</button>
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
export default ListMailGroup;