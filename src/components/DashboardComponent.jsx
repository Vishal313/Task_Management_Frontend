import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Box, Paper } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import TaskService from '../services/TaskService';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddTaskStatusComponent from './AddTaskStatusComponent';

class Popup extends Component {
    constructor(props) {
        super(props)

        this.state = {
            taskStatusList : [],
            task_id : '',
            task_type : "",
            start_date : "",            
            end_date : ""
        }
        this.dummyUpdate = this.dummyUpdate.bind(this);
    }

    dummyUpdate = () => {
        this.componentDidMount();
        this.props.refreshMe();
    }

    componentDidMount(){
        TaskService.getTaskStatusByTaskId(this.props.tsk_id).then((res) => {
            this.setState({taskStatusList : res.data.taskStatus.taskStatusList});
        });
    }

    render() {
      return (
        <div className = "App" >
          <div style = {{"width": "90%", "display": "block", marginLeft: "auto", marginRight: "auto"}}>
            <h1>Task Status</h1>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Task Type</TableCell>
                            <TableCell align="center">Start Date</TableCell>
                            <TableCell align="center">End Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            this.state.taskStatusList.map(
                                ts => 
                                <TableRow key={ts.task_status_id}>
                                    <TableCell align="center">{ts.task_type}</TableCell>
                                    <TableCell align="center">{ts.start_date}</TableCell>
                                    <TableCell align="center">{ts.end_date}</TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
          </div>
          
              <Box p = {2}>
                  <AddTaskStatusComponent task_id = {this.props.tsk_id} dummyCall = {this.dummyUpdate}/>
              </Box>
          
          <Button color="secondary" onClick={this.props.closePopup}>Close</Button>
        </div>
      );
    }
  }

class DashboardComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            resultList: [],
            taskStatusList : [],
            showPopup: false,
            currentTaskId : ''
        }
        this.togglePopup = this.togglePopup.bind(this);
        this.refreshPage = this.refreshPage.bind(this);
    }

    refreshPage () {
        this.componentDidMount();
    }

    togglePopup() {
        this.setState({
          showPopup: !this.state.showPopup
        });
      }
    
    componentDidMount(){
        TaskService.getAllTasks(window.sessionStorage.getItem("employee_id")).then((res) => {
            this.setState({resultList: res.data.employee.taskDetails});
        });
    }


    render() {
        return (
            <div className = "App">
                {this.state.showPopup ? 
                    <Paper style = {{"width": "60%", "display": "block", marginLeft: "auto", marginRight: "auto"}}>
                        <Box p = {2}>
                            <Popup closePopup={this.togglePopup} tsk_id = {this.state.currentTaskId} refreshMe = {this.refreshPage}/>
                        </Box>
                    </Paper>
                        : null
                }
                <Typography variant="h2">My Tasks</Typography>
                <Grid container spacing={1} justify="space-between" direction="row">
                    <Grid container item xs={3} spacing={3}>

                         <List>
                             <Typography variant="h5">BackLog</Typography>
                             {
                                 this.state.resultList.map(
                                     // eslint-disable-next-line
                                     ts => 
                                    {if (ts.current_task_status === "Backlog")
                                     return <ListItem alignItems="flex-start" key = {ts.task_id}>
                                        <Paper>
                                            <Box p = {3}> 
                                                <ListItemText primary={ts.task_name}/>
                                                <p>Status : {ts.current_task_status}</p>
                                                <p>Completed : {ts.is_completed ? "Yes" : "No"}</p>
                                                <Button color="primary" onClick={() => {this.setState({currentTaskId : ts.task_id}); this.togglePopup()}}>Status</Button>
                                            </Box>
                                        </Paper>
                                    </ListItem>
                                    }
                                )                             
                            }
                        </List>   

                    </Grid>


                    <Grid container item xs={3} spacing={3}>
                        <List>
                        <Typography variant="h5">In Progress</Typography>
                            {
                                 this.state.resultList.map(
                                     // eslint-disable-next-line
                                     ts => 
                                    {if (ts.current_task_status === "InProgress")
                                     return <ListItem alignItems="flex-start" key = {ts.task_id}>
                                        <Paper>
                                            <Box p = {3}> 
                                                <ListItemText primary={ts.task_name}/>
                                                <p>Status : {ts.current_task_status}</p>
                                                <p>Completed : {ts.is_completed ? "Yes" : "No"}</p>
                                                <Button color="primary" onClick={() => {this.setState({currentTaskId : ts.task_id}); this.togglePopup()}}>Status</Button>
                                            </Box>
                                        </Paper>
                                    </ListItem>
                                    }
                                )                             
                            }
                        </List>
                    </Grid>


                    <Grid container item xs={3} spacing={3}>
                        <List>
                            <Typography variant="h5">In Review</Typography>
                            {
                                 this.state.resultList.map(
                                     // eslint-disable-next-line
                                     ts => 
                                    {if (ts.current_task_status === "InReview")
                                     return <ListItem alignItems="flex-start" key = {ts.task_id}>
                                        <Paper>
                                            <Box p = {3}> 
                                                <ListItemText primary={ts.task_name}/>
                                                <p>Status : {ts.current_task_status}</p>
                                                <p>Completed : {ts.is_completed ? "Yes" : "No"}</p>
                                                <Button color="primary" onClick={() => {this.setState({currentTaskId : ts.task_id}); this.togglePopup()}}>Status</Button>
                                            </Box>
                                        </Paper>
                                    </ListItem>
                                    }
                                )                             
                            }
                        </List>
                    </Grid>


                    <Grid container item xs={3} spacing={3}>
                        <List>
                        <Typography variant="h5">Done</Typography>
                            {   
                                 this.state.resultList.map(
                                     // eslint-disable-next-line
                                     ts => 
                                    {if (ts.current_task_status === "Done")
                                     return <ListItem alignItems="flex-start" key = {ts.task_id}>
                                        <Paper>
                                            <Box p = {3}> 
                                                <ListItemText primary={ts.task_name}/>
                                                <p>Status : {ts.current_task_status}</p>
                                                <p>Completed : {ts.is_completed ? "Yes" : "No"}</p>
                                                <Button color="primary" onClick={() => {this.setState({currentTaskId : ts.task_id}); this.togglePopup()}}>Status</Button>
                                            </Box>
                                        </Paper>
                                    </ListItem>
                                    }
                                )                             
                            }
                        </List>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default DashboardComponent;