import React, { Component } from 'react';
import { Box, Paper } from '@material-ui/core';
import { TextField, Button } from '@material-ui/core';
import CredentialService from '../services/CredentialService';

class HeaderComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user_name : '',
      password : '', 
      employee_id : 0,
      loginText : 0,
      response_list : []
    }
    this.setUserNameHandler = this.setUserNameHandler.bind(this);
    this.setPasswordHandler = this.setPasswordHandler.bind(this);
    this.setEmployeeIdHandler = this.setEmployeeIdHandler.bind(this);

    this.checkCreds = this.checkCreds.bind(this);
  }

  setUserNameHandler= (event) => {
    this.setState({user_name: event.target.value});
  } 

  setPasswordHandler= (event) => {
    this.setState({password: event.target.value});
  } 

  setEmployeeIdHandler= (event) => {
    this.setState({employee_id: event.target.value})
  }

  checkCreds = (e) => {
    e.preventDefault();
    let cred = {user_name:this.state.user_name, password:this.state.password};
    CredentialService.checkCreds(cred).then(res => {
        this.setState({response_list: res.data});
        this.setState({employee_id : this.state.response_list.credential.employee.id});
        window.sessionStorage.clear();
        window.sessionStorage.setItem("employee_id", this.state.response_list.credential.employee.id); 
        window.sessionStorage.setItem("designation", this.state.response_list.credential.employee.designation);
        this.props.isLoggedIn(true, this.state.employee_id);
    });
    this.setState({loginText: 1});
  }

  render() {
    return (
      <div className = "App" >
      <Box p = {2} style = {{"width": "60%", marginLeft:"auto", marginRight: "auto"}}>
        <Paper>
          <Box p={4}>
            <div>
              <h1>Welcome to Task Management System!</h1>
              <h3>Please Login to Continue!</h3>
               <form method = "POST">
                 <div>
                    <TextField id="username" label="User Name" variant="outlined"
                       value = {this.state.user_name} onChange={this.setUserNameHandler}/>
                  </div> <br></br>
                  <div>
                    <TextField id="password" label="Password" type="password" variant="outlined"
                    value = {this.state.password} onChange={this.setPasswordHandler}/>
                 </div> <br></br>
                 <div>
                 <Button onClick={this.checkCreds} variant="contained" color="primary">Login</Button>
                 </div>
               </form>
            </div>
            {this.state.loginText === 1 ? <h3>Login Failed</h3> : null}
          </Box>
        </Paper>
      </Box>
      </div>
    );
  }
}

export default HeaderComponent;