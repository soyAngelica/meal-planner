import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import axios from 'axios';
import NavBar from './Components/NavBar';
import Meals from './Components/Meals';
import Daily from './Components/Daily';






class App extends Component {

  render() {

    return (
     
      <div>
          <NavBar />
          <Route path='/' component={Daily} />
          <Route path='/meals' component={Meals}/>
      </div>
          
    );
  }
}

export default App;