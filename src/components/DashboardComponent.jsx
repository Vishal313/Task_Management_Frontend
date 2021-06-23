import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Box, Paper } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

class DashboardComponent extends Component {
    render() {
        return (
            <div className = "App">
                <Typography variant="h2">My Tasks</Typography>
                <Grid container spacing={1} justify="space-between" direction="row">
                    <Grid container item xs={3} spacing={3}>
                        
                         <List>
                             <Typography variant="h5">BackLog</Typography>
                         <ListItem alignItems="flex-start">
                                <Paper>
                                    <Box p = {3}> 
                                        <ListItemText primary="Brunch this weekend?" secondary="Oh anoo"/>
                                    </Box>
                                </Paper>
                            </ListItem>
                            <ListItem alignItems="flex-start">
                                <Paper>
                                    <Box p = {3}> 
                                        <ListItemText primary="Brunch this weekend?" secondary="Oh anoo"/>
                                    </Box>
                                </Paper>
                            </ListItem>
                            <ListItem alignItems="flex-start">
                                <Paper>
                                    <Box p = {3}> 
                                        <ListItemText primary="Brunch this weekend?" secondary="Oh anoo"/>
                                    </Box>
                                </Paper>
                            </ListItem>
                        </List>   

                    </Grid>


                    <Grid container item xs={3} spacing={3}>
                        <List>
                        <Typography variant="h5">In Progress</Typography>
                         <ListItem alignItems="flex-start">
                                <Paper>
                                    <Box p = {3}> 
                                        <ListItemText primary="Brunch this weekend?" secondary="Oh anoo"/>
                                    </Box>
                                </Paper>
                            </ListItem>
                            <ListItem alignItems="flex-start">
                                <Paper>
                                    <Box p = {3}> 
                                        <ListItemText primary="Brunch this weekend?" secondary="Oh anoo"/>
                                    </Box>
                                </Paper>
                            </ListItem>
                        </List>
                    </Grid>


                    <Grid container item xs={3} spacing={3}>
                        <List>
                            <Typography variant="h5">In Review</Typography>
                         <ListItem alignItems="flex-start">
                                <Paper>
                                    <Box p = {3}> 
                                        <ListItemText primary="Brunch this weekend?" secondary="Oh anoo"/>
                                    </Box>
                                </Paper>
                            </ListItem>
                            <ListItem alignItems="flex-start">
                                <Paper>
                                    <Box p = {3}> 
                                        <ListItemText primary="Brunch this weekend?" secondary="Oh anoo"/>
                                    </Box>
                                </Paper>
                            </ListItem>
                            <ListItem alignItems="flex-start">
                                <Paper>
                                    <Box p = {3}> 
                                        <ListItemText primary="Brunch this weekend?" secondary="Oh anoo"/>
                                    </Box>
                                </Paper>
                            </ListItem>
                        </List>
                    </Grid>


                    <Grid container item xs={3} spacing={3}>
                        <List>
                        <Typography variant="h5">Done</Typography>
                         <ListItem alignItems="flex-start">
                                <Paper>
                                    <Box p = {3}> 
                                        <ListItemText primary="Brunch this weekend?" secondary="Oh anoo"/>
                                    </Box>
                                </Paper>
                            </ListItem>
                            <ListItem alignItems="flex-start">
                                <Paper>
                                    <Box p = {3}> 
                                        <ListItemText primary="Brunch this weekend?" secondary="Oh anoo"/>
                                    </Box>
                                </Paper>
                            </ListItem>
                            <ListItem alignItems="flex-start">
                                <Paper>
                                    <Box p = {3}> 
                                        <ListItemText primary="Brunch this weekend?" secondary="Oh anoo"/>
                                    </Box>
                                </Paper>
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default DashboardComponent;