
import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {useState,useEffect} from 'react';
import jwt from 'jsonwebtoken';
import {Link} from 'react-router-dom';

import "./listing.css";


function ListingMailIds() {

      // const [cust,setcust]=useState([])
      const [groups,setGroups]=useState([]);
      const navigate=useNavigate()
      const token = localStorage.getItem("token")
      // var tp1=[]

      useEffect(() => { async function getgroupmailiddata(){
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
                  let list=[]
                  response.data.map((item) => { list.push(item.address)})
                  console.log(list)
                  setGroups(list);
              }
        }
        getgroupmailiddata()
      }, [])

        // async function getcustmailiddata(){
        //   var decodedToken = jwt.decode(token);
        //       if(decodedToken.exp * 1000 < Date.now() ){
        //           navigate('/login');
        //       } else {
        //           var response = await axios.get('http://localhost:3002/customer/listemailids', {
        //               headers: {
        //                   "token": token
        //               }
        //           });
        //           console.log(response.data)
        //           response.data.map((e) => {
        //               tp1.push({name:`${e.cust_name}`, emailid:`${e.cust_email}`})
        //           }
        //           )
        //           setcust(tp1);
        //           tp1=[]
        //       }
        // }
        
        // getgroupmailiddata();
    //     getcustmailiddata();
    // }, [])


      // onAddingItem = (i) => (e) => {
      //       setMaildetails((state, props) => {
      //       mailidobject[i].isChecked = !mailidobject[i].isChecked;
      //     return {
      //       mailidobject: state.productsList
      //     }
      //   })
      // }
      // console.log(groups)
      // console.log(cust)
      // const mailidobject = {...groups,...cust}
      // console.log(mailidobject)
      
      // const [maildetails,setMaildetails]=useState({
      //   selectedItems: [],
      //   response: [],
      // });

      
      // const handleChange = (e) => {
      //   // Destructuring
      //   const { value, checked } = e.target;
      //   const { selectedItems } = maildetails;
          
      //   console.log(`${value} is ${checked}`);
         
      //   // Case 1 : The user checks the box
      //   if (checked) {
      //     maildetails({
      //       selectedItems: [...selectedItems, value],
      //       response: [...selectedItems, value],
      //     });
      //   }
      
      //   // Case 2  : The user unchecks the box
      //   else {
      //     maildetails({
      //       selectedItems: selectedItems.filter((e) => e !== value),
      //       response: selectedItems.filter((e) => e !== value),
      //     });
      //   }
      // };
      const [checked, setChecked] = useState([]);
      // Add/Remove checked item from list
          const handleCheck = (event) => {
            var updatedList = [...checked];
            if (event.target.checked) {
              updatedList = [...checked, event.target.value];
            } else {
              updatedList.splice(checked.indexOf(event.target.value), 1);
            }
            setChecked(updatedList);
          };

          // Generate string of checked items
          const checkedItems = checked.length
            ? checked.reduce((total, item) => {
                return total + ", " + item;
              })
            : "";

          // Return classes based on whether item is checked
          var isChecked = (item) => 
            checked.includes(item) ? "checked-item" : "not-checked-item";

  // return (
  //     <div>
  //     <form>
  //       {groups.map((data, i) => {
  //         return (
  //           <div key={i}>
  //             <input value={data.address} type="checkbox" id="flexCheckDefault" onChange={handleChange} />
  //             <span className={isChecked(data.address)} htmlFor="flexCheckDefault">{data.name} Emailid: {data.address}</span>
  //           </div>
  //         )
  //       })}

  //         <div className="form-floating mt-3 mb-3 text-center">
  //             <label htmlFor="exampleFormControlTextarea1">
  //               Mailidsselected :{" "}
  //             </label>
  //             <textarea
  //               className="form-control text"
  //               name="response"
  //               value={maildetails.response}
  //               placeholder="The checkbox values will be displayed here "
  //               id="floatingTextarea2"
  //               style={{ height: "150px" }}
  //               onChange={handleChange}
  //             ></textarea>
  //           </div>
  //     </form> 
  //   </div>
  // )

  return (
  <div className="app">
      <div className="checkList">
        <div className="title">Your CheckList:</div>
        <div className="list-container">
          {groups.map((item, index) => (
            <div key={index}>
              <input value={item} type="checkbox" onChange={handleCheck} />
              <span  className={isChecked(item)} >{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        {`Items checked are: ${checkedItems}`}
      </div>
    </div>
  );
}

export default ListingMailIds;