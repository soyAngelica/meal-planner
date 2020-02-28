import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import axios from 'axios';
import DailyNavBar from './Components/NavBar';
import MainNavBar from './Components/MainNavBar';
import Meals from './Components/Meals';
import Daily from './Components/Daily';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    padding: 40,
  },
  
}));




export default function App() { 
  
  const classes = useStyles();
  
      return (
       
        <Container maxWidth="sm" className={classes.wrapper}>             
            <Route exact path='/'>
              <Daily />
              <DailyNavBar />          
            </Route>
            <Route exact path='/meals'>
              <Meals/>
              <MainNavBar />
            </Route>
        </Container>
            
      );
    
}
