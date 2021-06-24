import { Typography } from '@material-ui/core';
import React, { Component } from 'react';

class WelcomeComponent extends Component {
    render() {
        return (
            <div className = "App">
                <Typography variant = "h1">Welcome to Task Management System</Typography>
            </div>
        );
    }
}

export default WelcomeComponent;