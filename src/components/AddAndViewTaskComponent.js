import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';
import { Paper, Box } from '@material-ui/core';
import TaskService from '../services/TaskService';
import { Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { TextField } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(0.3, 0.3, 0.3),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function AddAndViewTaskComponent(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openCreate, setOpenCreate] = React.useState(false);
  const [resultList, setresultList] = React.useState([]);
  const [taskName, settaskName] = React.useState('');
  const [projectId, setProjectId] = React.useState('');

  const setProjectIdHandler = (event) => {
    setProjectId(event.target.value);
  }

  const setTaskNameHandler = (event) => {
    settaskName(event.target.value);
  }

  const handleResultList = (res) => {
    setresultList(res);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
};

  const getTaskDetails = () => {
    TaskService.getAllTasks(props.employee_id).then((res) => {
        handleResultList(res.data.employee.taskDetails);
    });
  };

  const createNewTask = () => {
    let task = ({task_name: taskName, project_id: projectId, current_task_status: "Backlog", is_completed: "false", employee_id: props.employee_id});
    TaskService.createNewTask(task).then((res) => {
        alert(res.data.projects.Message);
        handleCloseCreate();
    });
  };

  const viewTask = (
    <div className={classes.paper}>
        <div className = "App">
            <Paper>
                <Box p = {4}>
                    <Typography variant = "h5">Tasks of {props.employee_name}</Typography>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Task Name</TableCell>
                                    <TableCell align="center">Status</TableCell>
                                    <TableCell align="center">Is Completed</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    resultList.map((ts) => (                                        
                                        <TableRow key={ts.task_id}>
                                            <TableCell align="center">{ts.task_name}</TableCell>
                                            <TableCell align="center">{ts.current_task_status}</TableCell>
                                            <TableCell align="center">{ts.is_completed ? "Yes" : "No"}</TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Paper>
      </div>
    </div>
  );

  const addTask = (
    <div className={classes.paper}>
        <div className = "App">
            <Paper>
                <Box p = {2}>
                    <Typography variant = "h5">Add New Task For {props.employee_name}</Typography>
                    <TextField style = {{paddingTop: "8px"}} label="Task Name" variant="outlined"
                       value = {taskName} onChange={setTaskNameHandler}/>
                    
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel>Project</InputLabel>
                        <Select
                        value={projectId}
                        onChange={setProjectIdHandler}
                        >
                            {
                                props.projectList.map((proj) =>(
                                    <MenuItem value={proj.project_id}>{proj.project_name}</MenuItem>
                                ))                            
                            }   
                        </Select>
                    </FormControl>
                    <Button color="primary" onClick={createNewTask}>Add Task</Button>
                </Box>
            </Paper>
      </div>
    </div>
  );

  return (
    <div className = "App">
      <Button onClick={() => {handleOpen(); getTaskDetails()}} color="primary" size="small">View Tasks</Button>
      <Button onClick={handleOpenCreate} color="primary" size="small">Add Tasks</Button>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {viewTask}
      </Modal>

      <Modal
        className={classes.modal}
        open={openCreate}
        onClose={handleCloseCreate}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {addTask}
      </Modal>
    </div>
  );
}