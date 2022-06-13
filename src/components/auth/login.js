import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Login () {
  const[email, setEmail] =React.useState('')
  const[password, setPassword] =React.useState('')
  const errors={}

  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault()
    try{
        var response = await axios.post('https://bulkemailtool-backend.herokuapp.com/register/signin', {
            email: email,
            password: password,
        })
        if(response.data) {
            await localStorage.setItem("token", response.data)
            navigate('/dashboard');
        }
    }catch(err) {
        alert("User does not exist or Password is incorrect")
    }
}

return (
  <div className="container">
    <div style={{ marginTop: "4rem" }} className="row">
      <div className="col s8 offset-s2">
        <Link to="/" className="btn-flat waves-effect"> <i className="material-icons left">keyboard_backspace</i> Back to home </Link>
        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
          <h4>
            <b>Login</b> below
          </h4>
          <p className="grey-text text-darken-1">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
        <form noValidate onSubmit={onSubmit}>
          <div className="input-field col s12">
            <input onChange={(e) => setEmail(e.target.value)} value={email} error={errors.email} id="email" type="email"/>
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-field col s12">
            <input onChange={(e) => setPassword(e.target.value)} value={password} error={errors.password} id="password" type="password"/>
            <label htmlFor="password">Password</label>
          </div>
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <button style={{width: "150px",borderRadius: "3px", letterSpacing: "1.5px", marginTop: "1rem"}} type="submit"
              className="btn btn-large waves-effect waves-light hoverable blue accent-3">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);
}

export default Login;