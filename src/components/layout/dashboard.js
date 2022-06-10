import React from 'react';
import {useNavigate} from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  return(
      <div style={{margin:'5%'}}>
        <h3> EMAILING DASHBOARD</h3>
              <button style={{ width: "200px", borderRadius: "3px", letterSpacing: "1px"}} className="btn btn-large waves-effect waves-light hoverable blue accent-3" onClick={() => navigate(-1)}> Go Back </button> &nbsp; &nbsp;
              <button style={{ width: "200px", borderRadius: "3px", letterSpacing: "1px"}} className="btn btn-large waves-effect waves-light hoverable blue accent-3" onClick={() => navigate(1)}> Go Forward </button> &nbsp; &nbsp;
              <br />
              <br />
              <br />
              <br />

              <button style={{ width: "600px", borderRadius: "3px", letterSpacing: "1.5px"}} className="btn btn-large waves-effect waves-light hoverable accent-3" onClick={() => navigate('/email')}>
                Create email
              </button>
              <br/>
              <br />
              <button style={{ width: "600px", borderRadius: "3px", letterSpacing: "1.5px"}} className="btn btn-large waves-effect waves-light hoverable accent-3" onClick={() => navigate('/group')}>
                EMAIL group 
              </button>
              <br />
              <br />
              
              <button style={{ width: "600px", borderRadius: "3px", letterSpacing: "1.5px"}} className="btn btn-large waves-effect waves-light hoverable accent-3" onClick={() => navigate('/templates')}>
                EMAIL templates
              </button>
              <br/>
              <br />
              <button style={{ width: "600px", borderRadius: "3px", letterSpacing: "1.5px"}} className="btn btn-large waves-effect waves-light hoverable accent-3" onClick={() => navigate('/customer')}>
                Customer Dashboard
              </button>
              <br/>
        </div>
    )
}

export default Dashboard;