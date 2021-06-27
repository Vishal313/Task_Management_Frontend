import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import ProjectService from '../services/ProjectService';
import { Box, Paper } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import CredentialService from '../services/CredentialService';


class SettingsComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            empDetails: [],
            tlname : '',
            mngName : '',
            newPassword : ''
        }
        this.setPasswordHandler = this.setPasswordHandler.bind(this);
        this.changePassword = this.changePassword.bind(this);
    }
    componentDidMount() {
        ProjectService.getEmployeeByID(window.sessionStorage.getItem("employee_id")).then((res) => {
            this.setState({ empDetails: res.data.employee.employeedetails[0]});
            this.setState({tlname: this.state.empDetails.team_leader.name, mngName: this.state.empDetails.manager.name});
        });
    }

    setPasswordHandler = (event) => {
        this.setState({newPassword: event.target.value});
    }

    changePassword = (event) => {
        event.preventDefault();
        let cred = {employee_id: window.sessionStorage.getItem("employee_id"), password : this.state.newPassword};
        console.log(JSON.stringify(cred));
        CredentialService.updateCreds(cred).then((res) => {
            alert(res.data.credential.Message);
        });
        
    }

    render() {
        return (
            <div>
                <div className="App" style={{ "width": "70%", "display": "block", marginLeft: "auto", marginRight: "auto" }}>

                    <Box p={2}>
                        <Typography variant="h4">About Me</Typography>
                        {/* <Typography variant = "h5">Manager : {this.state.empDetails.manager.name}</Typography>  */}
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Title</TableCell>
                                        <TableCell align="center">Value</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center">Name</TableCell>
                                        <TableCell align="center">{this.state.empDetails.employee_name}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center">Email</TableCell>
                                        <TableCell align="center">{this.state.empDetails.employee_email}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center">Manager</TableCell>
                                        <TableCell align="center">{this.state.empDetails.is_manager ? "Yes" : this.state.mngName}</TableCell>
                                    </TableRow>
                                    {this.state.is_manager === false ?
                                    <TableRow>
                                        <TableCell align="center">Team Leader</TableCell>
                                        <TableCell align="center">{this.state.empDetails.is_tl ? "Yes" :this.state.tlname}</TableCell>
                                    </TableRow>
                                    : null
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </div>
                <div className="App" style={{ "width": "30%", "display": "block", marginLeft: "auto", marginRight: "auto" }}>
                    <Box>
                        <Paper>
                            <Box p = {2}>
                                <Typography variant = "h5">Change Password</Typography>
                                <div style = {{paddingTop: "25px"}}>
                                <TextField type="password" label="New Password" variant="outlined" value = {this.state.newPassword} onChange = {this.setPasswordHandler}></TextField>
                                </div>
                                <div style = {{paddingTop: "25px"}}>
                                <Button color = "primary" onClick = {this.changePassword}>Change Password</Button>
                                </div>
                            </Box>
                        </Paper>
                    </Box>
                </div>
            </div>
        );
    }
}

export default SettingsComponent;