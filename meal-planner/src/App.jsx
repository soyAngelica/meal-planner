import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import axios from 'axios';
import NavBar from './Components/NavBar';
import Meals from './Components/Meals';
import Daily from './Components/Daily';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';




class App extends Component {

    render() {
      return (
       
        <Container maxWidth="sm">             
            <Route path='/' component={Daily} />
            <Route path='/meals' component={Meals}/>
            <NavBar />          
        </Container>
            
      );
    }
}

export default App;