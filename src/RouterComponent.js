import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Navbar from "./components/layout/navbar";
import Landing from "./components/layout/landing";
import Dashboard from "./components/layout/dashboard.js"

import DashboardEmail from "./components/email/email.js"
import ListingMailIds from "./components/email/listing.js"

import ListMailGroup from "./components/group/group.js"
import AddGroup from "./components/group/addgroup.js"
import EditGroup from "./components/group/editgroup.js"
import ViewGroupMembers from "./components/group/viewgroupmembers.js"

import DashboardCustomer from "./components/customer/customer.js"
import AddCustomer from "./components/customer/addcustomer.js"
import EditCustomer from "./components/customer/editcustomer.js"



import DashboardTemplates from "./components/emailtemplate/etemplate.js"
import AddTemplate from "./components/emailtemplate/addtemplate.js"
import EditTemplate from "./components/emailtemplate/edittemplate.js"


function RouterComponent () {
    return (
      <div>
      <BrowserRouter>
        <Navbar />      
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>

          <Route path="/dashboard" element={<Dashboard />}> </Route>

          <Route path="/email" element={<DashboardEmail />}> </Route>
          <Route path="/email/selectemailids" element={<ListingMailIds />}> </Route>


          <Route path="/customer" element={<DashboardCustomer />}> </Route>
          <Route path="/customer/addcustomer" element={<AddCustomer />}> </Route>
          <Route path="/customer/editcustomer" element={<EditCustomer />}> </Route>

          <Route path="/group" element={<ListMailGroup />}> </Route>
          <Route path="/group/addgroup" element={<AddGroup />}> </Route>
          <Route path="/group/viewgroupmembers" element={<ViewGroupMembers />}> </Route>
          
          <Route path="/templates" element={<DashboardTemplates />}> </Route>
          <Route path="/templates/edittemplate" element={<AddTemplate />}> </Route>
          <Route path="/templates/addtemplates" element={<EditTemplate />}> </Route>

        </Routes>
      </BrowserRouter>
      </div>
    );
}
export default RouterComponent;