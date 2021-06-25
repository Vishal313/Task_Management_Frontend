import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Button } from '@material-ui/core';
import { format } from "date-fns";
import TaskService from '../services/TaskService';


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

export default function AddTaskStatusComponent(props) {
  const classes = useStyles();
  const [startDate, setstartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [taskStatus, setTaskStatus] = React.useState('');

  const handleStartDateChange = (date) => {
    setstartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handheTaskStatusChange = (event) => {
    setTaskStatus(event.target.value);
  };

  const insertTaskStatus = (event) => {
    event.preventDefault();
    let task = {task_id: props.task_id,task_type: taskStatus, start_date: format(startDate, "yyyy-MM-dd"), end_date: format(endDate, "yyyy-MM-dd")};
    TaskService.createNewTaskStatus(task).then(res => {
      props.dummyCall();
    });
  }

  return (
    <div>
      <div>
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={taskStatus}
          onChange={handheTaskStatusChange}
          label="Status"
        >
          <MenuItem value={"Backlog"}>Backlog</MenuItem>
          <MenuItem value={"InProgress"}>In Progress</MenuItem>
          <MenuItem value={"InReview"}>In Review</MenuItem>
          <MenuItem value={"Done"}>Done</MenuItem>
        </Select>
      </FormControl>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="yyyy-MM-dd"
            margin="normal"
            id="start_date"
            label="Start Date"
            value={startDate}
            onChange={handleStartDateChange}
            KeyboardButtonProps={{
                'aria-label': 'change date',
            }}
            />
            <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="yyyy-MM-dd"
            margin="normal"
            id="end_date"
            label="End Date"
            value={endDate}
            onChange={handleEndDateChange}
            KeyboardButtonProps={{
                'aria-label': 'change date',
            }}
            />
    </MuiPickersUtilsProvider>
    </div>
    <Button color="primary" onClick={insertTaskStatus}>Add Status</Button>
    </div>
  );
}