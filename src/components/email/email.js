import React from 'react';
import './email.css';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';

function DashboardEmail() {

  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token")

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email || !subject || !message) {
      return toast.error('Please fill email, subject and message');
    }
    try {
      setLoading(true);
      const { data } = await axios.post(`https://bulkemailtool-backend.herokuapp.com/emailer/email`, {
        email,
        subject,
        message,
      },{
        headers: {
            "token": token
        }
    });
      setLoading(false);
      toast.success(data.message);
    } catch (err) {
      setLoading(false);
      toast.error(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    }
  };
  return (
    <div className="App">
      <ToastContainer position="bottom-center" limit={1} />
      <header className="App-header">
        <form>

          <h1>Send Email</h1>
          <Link to= '/email/selectemailids'> 
        <button className="btn btn-info"> Select who to send</button> 
      </Link>
          <div>
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            ></input>
          </div>
          <div>
            <label htmlFor="subject">Subject</label>
            <input
              id="subject"
              type="text"
              onChange={(e) => setSubject(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <div>
            <Button variant="primary" onSubmit={submitHandler}>
                Submit
            </Button>
          </div>
        </form>
      </header>
    </div>
  );
}


export default DashboardEmail;