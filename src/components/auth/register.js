import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from "yup";



function Register () {
  const initialValue = {
    uname: '',
    email: '',
    password: '',
    phone: ''
  };

  const navigate = useNavigate();

  const schema = Yup.object().shape({
    uname: Yup.string()
    .required("Name is a required field")
    .min(4, "Name must be at least 4 characters")
    .max(50, "Name must be less than 50 characters"),
    email: Yup.string()
      .required("Email is a required field")
      .email("Invalid email format")
      .min(6, "Name must be at least 4 characters")
      .max(50, "Name must be less than 50 characters"),
    password: Yup.string()
      .required("Password is a required field")
      .min(8, "Password must be at least 8 characters")
      .max(50, "Password must be less than 50 characters"),
    phone: Yup.number()
      .required("Phone is a required field")
      .min(10, "Phone must be a 10 digit number. Only India numbers supported."), 
  });

  
  const handleSubmit = async (e) => {
    try{
      var response = await axios.post('http://localhost:3002/register/signup', {
          name: e.uname,
          email: e.email,
          password: e.password,
          phone: e.phone
      })
      if(response.data) {
          await localStorage.setItem("token", response.data)
          navigate('/login');
      }
  }catch(err) {
     alert('The user already exist')
  }
    
}

return (
<div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Signup</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
            <Formik validationSchema={schema} initialValues={initialValue} onSubmit={handleSubmit}>
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit,}) => (
                      <form onSubmit={handleSubmit}>
                          <div className="input-field col s12">
                            <input onChange={handleChange} value={values.uname} id="uname" type="text" onBlur={handleBlur}/>
                            <label htmlFor="uname">Name</label>
                            <span style={{ color: 'red' }}>{touched.uname && errors.uname}</span>
                          </div>
                          <div className="input-field col s12">
                            <input onChange={handleChange} value={values.email} id="email" type="email" onBlur={handleBlur}/> 
                            <label htmlFor="email">Email</label>
                            <span style={{ color: 'red' }}>{touched.email && errors.email}</span>
                          </div>
                          <div className="input-field col s12">
                            <input onChange={handleChange} value={values.password} id="password" type="password" onBlur={handleBlur}/>
                            <label htmlFor="password">Password</label>
                            <span style={{ color: 'red' }}>{touched.password && errors.password}</span>
                          </div>
                          <div className="input-field col s12">
                            <input onChange={handleChange} value={values.phone} id="phone" type="tel" onBlur={handleBlur}/>
                            <label htmlFor="phone">Phone Number</label>
                            <span style={{ color: 'red' }}>{touched.phone && errors.phone}</span>
                          </div>
                          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <button style={{width: "150px",borderRadius: "3px",letterSpacing: "1.5px",marginTop: "1rem"}} type="submit" className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                              Sign up
                            </button>
                          </div>
                    </form>
                  )}
            </Formik>
          </div>
        </div>
      </div>
    );
}
export default Register;