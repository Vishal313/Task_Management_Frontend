import React, { Component } from 'react';
import { Box, Paper } from '@material-ui/core';
import { TextField, Button } from '@material-ui/core';
import CredentialService from '../services/CredentialService';

class HeaderComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user_name : '',
      password : ''
    }
    this.setUserNameHandler = this.setUserNameHandler.bind(this);
    this.setPasswordHandler = this.setPasswordHandler.bind(this);

    this.checkCreds = this.checkCreds.bind(this);
  }

  setUserNameHandler= (event) => {
    this.setState({user_name: event.target.value});
  } 

  setPasswordHandler= (event) => {
    this.setState({password: event.target.value});
  } 

  checkCreds = (e) => {
    e.preventDefault();
    let cred = {user_name:this.state.user_name, password:this.state.password};
    console.log('Credential => ' + JSON.stringify(cred));
    CredentialService.checkCreds(cred).then(res => {
      // this.props.history.push('/');
    });
  }

  render() {
    return (

      <Box p = {2}>
        <Paper>
          <Box px={4} py={2}>
            <div>
              <h3>Welcome to Task Manager! Please Login to Continue</h3>
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
          </Box>
        </Paper>
      </Box>
    );
  }
}

export default HeaderComponent;