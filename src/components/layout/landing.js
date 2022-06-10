import React, { Component } from "react";
import { Link } from "react-router-dom";
class Landing extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h3>
            <p className="flow-text blue-text text-darken-1"> ARE YOU LOOKING TO TARGET YOUR CUSTOMERS WITH INFO ABOUT PRODUCT LAUNCHES AND OFFERS!</p></h3>
            <h4> <b>Welcome</b> to {" "} <span style={{ fontFamily: "monospace" }}>SameeBulkEmailer!</span></h4>
            <br />
            <br />
            <br />
            <div className="col s6">
              <Link to="/register" style={{ width: "140px", borderRadius: "3px", letterSpacing: "1.5px"}} className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                Sign Up
              </Link>
            </div>
            <div className="col s6">
              <Link to="/login" style={{ width: "140px", borderRadius: "3px",letterSpacing: "1.5px"}} className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Landing;