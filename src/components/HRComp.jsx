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
            isHr : "0",
            isTl : "0",
            isMngr : "0",
            employeeList : []
        }
        this.seDesignationHandler = this.seDesignationHandler.bind(this);
        this.setManagerIdHandler = this.setManagerIdHandler.bind(this);
        this.setTeamLeadIdHandler = this.setTeamLeadIdHandler.bind(this);
        this.addProjectHander = this.addProjectHander.bind(this);
        this.setProjectNameHandler = this.setProjectNameHandler.bind(this);
        this.addUserHandler = this.addUserHandler.bind(this);
        this.setEmployeeNameHandler = this.setEmployeeNameHandler.bind(this);
        this.setEmployeeEmailHandler = this.setEmployeeEmailHandler.bind(this);
    }

    componentDidMount (){
        TaskService.getAllEmployee().then((res) => {
            this.setState({employeeList: res.data.employee.employeedetails});
        });
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
        this.setState({designation: event.target.value});
    }

    setTeamLeadIdHandler = (event) => {
        this.setState({teamLeadId: event.target.value});
    }

    setManagerIdHandler = (event) => {
        this.setState({managerId: event.target.value});
      }
    
    addUserHandler (event){
        event.preventDefault();
        let emp = {employee_name: this.state.empName, employee_email: this.state.empEmail, 
        team_leader_id: this.state.teamLeadId, manager_id : this.state.managerId, hr_id: window.sessionStorage.getItem("employee_id"),
        is_hr: this.state.isHr, is_manager: this.state.isMngr, is_tl : this.state.isTl};
        console.log(emp);
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
                                        <TextField label="User Name" variant="outlined" />
                                    </div>
                                    <div style = {{paddingTop: "10px"}}>
                                        <TextField label="User Email" variant="outlined" />
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
        );
    }
}

export default HRComp;