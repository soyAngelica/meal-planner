import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import Generate from './Generate';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles(theme => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
  iconGenerate: {
    fontSize: 32,
    width: 68,
    margin: '0 auto'
  }
}));



export default function NavBar() {
  
  const classes = useStyles();
    
    return (
      
        <AppBar position="fixed" color="primary" className={classes.appBar}>
          <Toolbar> 
            <Generate/>
          </Toolbar>
        </AppBar>
      
    );

}     
  
