import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Box, Paper } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Button } from '@material-ui/core';
import TaskService from '../services/TaskService';
import ProjectService from '../services/ProjectService';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


class HRComp extends Component {
    constructor(props){
        super(props)

        this.state = {
            showAddEmp : false,
            managerId : '',
            teamLeadId : '',
            designation : '',
            projName : '',
            empName : '',
            empEmail : '',
            isHr : "false",
            isTl : "false",
            isMngr : "false",
            empManager : "",
            employeeList : [],
            projectList : []
        }
        this.seDesignationHandler = this.seDesignationHandler.bind(this);
        this.setManagerIdHandler = this.setManagerIdHandler.bind(this);
        this.setTeamLeadIdHandler = this.setTeamLeadIdHandler.bind(this);
        this.addProjectHander = this.addProjectHander.bind(this);
        this.setProjectNameHandler = this.setProjectNameHandler.bind(this);
        this.addUserHandler = this.addUserHandler.bind(this);
        this.setEmployeeNameHandler = this.setEmployeeNameHandler.bind(this);
        this.setEmployeeEmailHandler = this.setEmployeeEmailHandler.bind(this);
        this.setEmpManagerNameHandler = this.setEmpManagerNameHandler.bind(this);
    }

    componentDidMount (){
        TaskService.getAllEmployee().then((res) => {
            this.setState({employeeList: res.data.employee.employeedetails});
        });

        ProjectService.getAllProjects().then((res) => {
            this.setState({projectList : res.data.projects});
        });
    }

    setEmpManagerNameHandler = (event) => {
        this.setState({empManager: event.target.value, isTl : "true"});
    }

    setEmployeeEmailHandler = (event) => {
        this.setState({empEmail: event.target.value})
    }

    setEmployeeNameHandler  = (event) => {
        this.setState({empName: event.target.value})
    }

    setProjectNameHandler = (event) => {
        this.setState({projName: event.target.value})
    }

    seDesignationHandler = (event) => {
        if (event.target.value === "Manager")
            this.setState({isMngr: 'true', teamLeadId: '-1'});
        this.setState({designation: event.target.value});
    }

    setTeamLeadIdHandler = (event) => {
        this.setState({teamLeadId: event.target.value});
        this.state.employeeList.map(
            // eslint-disable-next-line
            emp => 
            {
                if (emp.team_leader.id === JSON.stringify(event.target.value))
                    this.setState({empManager : emp.manager.id});
            }
        )
    }

    setManagerIdHandler = (event) => {
        this.setState({managerId: event.target.value});
      }
    
    addUserHandler (event){
        event.preventDefault();
        let emp = {employee_name: this.state.empName, employee_email: this.state.empEmail, 
        team_leader_id: this.state.teamLeadId, manager_id : this.state.empManager, hr_id: window.sessionStorage.getItem("employee_id"),
        is_hr: this.state.isHr, is_manager: this.state.isMngr, is_tl : this.state.isTl};
        ProjectService.createNewUser(emp).then((res) => {
            console.log(JSON.stringify(res));
            alert(res.data.employee.message);
            window.location.reload();
        });
    }
    
    addProjectHander(event){
        event.preventDefault();
        let project = {project_name: this.state.projName, employee_id: this.state.managerId};
        ProjectService.createNewProject(project).then((res) => {
            alert('Project Created Successfully!');
            this.componentDidMount();
        });
    }

    render() {
        return (
            <div className="App" style = {{paddingTop: "25px"}}>
                <div style = {{"width": "50%", "display": "block", marginLeft: "auto", marginRight: "auto"}}>
                    <Typography variant="h5">Project List</Typography>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Project Name</TableCell>
                                    <TableCell align="center">Is Completed</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.state.projectList.map(
                                        pj => 
                                        <TableRow key={pj.project_id}>
                                            <TableCell align="center">{pj.project_name}</TableCell>
                                            <TableCell align="center">{pj.is_completed ? "Yes" : "No"}</TableCell>
                                        </TableRow>
                                    )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

                <div style = {{"width": "50%", "display": "block", marginLeft: "auto", marginRight: "auto", paddingTop: "20px"}}>
                    <Typography variant="h5">Manager List</Typography>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Manager Name</TableCell>
                                    <TableCell align="center">Email Id</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {
                                    this.state.employeeList.map(
                                        // eslint-disable-next-line
                                        emp => 
                                        {
                                        if (emp.is_manager === true)
                                        return <TableRow key={emp.employee_id}>
                                            <TableCell align="center">{emp.employee_name}</TableCell>
                                            <TableCell align="center">{emp.employee_email}</TableCell>
                                        </TableRow>
                                        }
                                    )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

                <div style = {{"width": "50%", "display": "block", marginLeft: "auto", marginRight: "auto", paddingTop: "20px"}}>
                    <Typography variant="h5">Team Lead List</Typography>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Team Lead Name</TableCell>
                                    <TableCell align="center">Email Id</TableCell>
                                    <TableCell align="center">Manager</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {
                                    this.state.employeeList.map(
                                        // eslint-disable-next-line
                                        emp => 
                                        {
                                        if (emp.is_tl === true)
                                        return <TableRow key={emp.employee_id}>
                                            <TableCell align="center">{emp.employee_name}</TableCell>
                                            <TableCell align="center">{emp.employee_email}</TableCell>
                                            <TableCell align="center">{emp.manager.name}</TableCell>
                                        </TableRow>
                                        }
                                    )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

                <div style = {{"width": "50%", "display": "block", marginLeft: "auto", marginRight: "auto", paddingTop: "20px"}}>
                    <Typography variant="h5">Employee List</Typography>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Employee Name</TableCell>
                                    <TableCell align="center">Email Id</TableCell>
                                    <TableCell align="center">Manager</TableCell>
                                    <TableCell align="center">Team Leader</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {
                                    this.state.employeeList.map(
                                        // eslint-disable-next-line
                                        emp => 
                                        {
                                        if (emp.is_tl === true)
                                        return <TableRow key={emp.employee_id}>
                                            <TableCell align="center">{emp.employee_name}</TableCell>
                                            <TableCell align="center">{emp.employee_email}</TableCell>
                                            <TableCell align="center">{emp.manager.name}</TableCell>
                                            <TableCell align="center">{emp.team_leader.name}</TableCell>
                                        </TableRow>
                                        }
                                    )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                
                <div style = {{paddingTop: "25px"}}>
                <Grid container spacing={1} justify="space-around" direction="row">
                    
                    <Grid container item xs={3} spacing={3}>
                        <Box>
                            <Paper>
                                <Box p = {3}>
                                    <Typography variant = "h5">Add Project</Typography>
                                    <div>
                                        <TextField label="Project Name" variant="outlined" value = {this.state.projName} onChange = {this.setProjectNameHandler}/>
                                    </div>
                                    <div>
                                        <FormControl variant="outlined" style = {{paddingTop: "20px"}}>
                                            <InputLabel>Manager</InputLabel>
                                            <Select value={this.state.managerId} onChange={this.setManagerIdHandler} style = {{minWidth: "215px"}}>
                                                {
                                                    this.state.employeeList.map(
                                                        // eslint-disable-next-line
                                                        emp => 
                                                        { 
                                                        if(emp.is_manager)
                                                            return <MenuItem value={emp.employee_id} key={emp.employee_id}>{emp.employee_name}</MenuItem>
                                                        }
                                                    )
                                                }
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div>
                                        <Button color="primary" onClick={this.addProjectHander}>Add Project</Button>
                                    </div>
                                </Box>
                            </Paper>
                        </Box>
                    </Grid>

                    <Grid container item xs={3} spacing={3}>
                        <Box>
                            <Paper>
                                <Box p = {3}>
                                    <Typography variant = "h5">Add User</Typography>
                                    <div>
                                        <TextField label="User Name" variant="outlined" value = {this.state.empName} onChange={this.setEmployeeNameHandler}/>
                                    </div>
                                    <div style = {{paddingTop: "10px"}}>
                                        <TextField label="User Email" variant="outlined" value = {this.state.empEmail} onChange={this.setEmployeeEmailHandler}/>
                                    </div>
                                    <div>
                                    <FormControl variant="outlined" style = {{paddingTop: "20px"}}>
                                            <InputLabel>Designation</InputLabel>
                                            <Select value = {this.state.designation} onChange = {this.seDesignationHandler} style = {{minWidth: "215px"}}>
                                                <MenuItem value={"Manager"}>Manager</MenuItem>
                                                <MenuItem value={"TL"}>Team Leader</MenuItem>
                                                <MenuItem value={"Employee"}>Employee</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div>
                                        
                                        {
                                            this.state.designation === "TL" ? 
                                            <div>
                                                <FormControl variant="outlined" style = {{paddingTop: "20px"}}>
                                                <InputLabel>Manager</InputLabel>
                                                <Select value={this.state.empManager} onChange={this.setEmpManagerNameHandler} style = {{minWidth: "215px"}}>
                                                    {
                                                        this.state.employeeList.map(
                                                            // eslint-disable-next-line
                                                            emp => 
                                                            { 
                                                            if(emp.is_manager)
                                                                return <MenuItem value={emp.employee_id} key={emp.employee_id}>{emp.employee_name}</MenuItem>
                                                            }
                                                        )
                                                    }
                                                </Select>
                                                </FormControl>
                                            </div>
                                            : null
                                        }
                                        {
                                            this.state.designation === "Employee" ?
                                            <div>
                                                <FormControl variant="outlined" style = {{paddingTop: "20px"}}>
                                                <InputLabel>Team Lead</InputLabel>
                                                <Select value = {this.state.teamLeadId} onChange = {this.setTeamLeadIdHandler} style = {{minWidth: "215px"}}>
                                                {
                                                        this.state.employeeList.map(
                                                            // eslint-disable-next-line
                                                            emp => 
                                                            { 
                                                            if(emp.is_tl)
                                                                return <MenuItem value={emp.employee_id} key={emp.employee_id}>{emp.employee_name}</MenuItem>
                                                            }
                                                        )
                                                    }
                                                </Select>
                                                </FormControl> 
                                            </div>
                                            : null
                                        }
                                    </div>
                                    <div>
                                        <Button color="primary" onClick={this.addUserHandler}>Add User</Button>
                                    </div>
                                </Box>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
                </div>
            </div>
        );
    }
}

export default HRComp;