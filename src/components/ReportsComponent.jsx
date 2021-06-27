import React, { Component } from 'react';
import ProjectService from '../services/ProjectService';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Typography, Paper } from '@material-ui/core';

class ReportsComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            employeeList : [],
            projectList : []
        }
    }
    
    componentDidMount(){
        ProjectService.getAllManagerRelatedDetails(window.sessionStorage.getItem("employee_id")).then((res) => {
            this.setState({projectList: res.data.employee.projectList, employeeList: res.data.employee.employeedetails});
        });
    }

    render() {
        return (
            <div className="App" style = {{"width": "60%", "display": "block", marginLeft: "auto", marginRight: "auto", paddingTop: "20px"}}>
                    <Typography variant="h5">Team Leaders</Typography>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Name</TableCell>
                                    <TableCell align="center">Email Id</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.state.employeeList.map(
                                        // eslint-disable-next-line
                                        emp => 
                                         <TableRow key={emp.employee_id}>
                                            <TableCell align="center">{emp.employee_name}</TableCell>
                                            <TableCell align="center">{emp.employee_email}</TableCell>
                                        </TableRow>
                                    )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
            </div>
        );
    }
}

export default ReportsComponent;