import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import Generate from './Generate';
import { withStyles } from "@material-ui/core/styles";
import { Container } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';


const styles = theme => ({
    list: {
      display:'inline-block',
      marginLeft:7,
      '& button': {
        background: 'transparent',
        border:' none',
        outline: 'none',
        color: 'white'
      }
    },
    
    text: {
      padding: theme.spacing(2, 2, 0),
    },
    paper: {
      paddingBottom: 50,
    },
   
    subheader: {
      backgroundColor: theme.palette.background.paper,
    },
    appBar: {
      top: '0',
      background: 'black'
    },
    grow: {
      flexGrow: 1,
    },
    center: {
      position: 'relative'
    }
  
})


class TopNavBar extends Component   {

    constructor(props) {
        super(props); 
        this.state  = {
            plans: [],
            intervalIsSet: false
        };
        
    }

    getDataPlan = () => {
        fetch('http://localhost:3001/meals/getPlans')
        .then((plans) => plans.json())
        .then((res) => this.setState({ plans: res.plans }))
        .catch(function(error) {
            console.log(error.message);
        });
    };

    componentDidMount() { 
        this.getDataPlan();
        if (!this.state.intervalIsSet) {
            let interval = setInterval(this.getDataPlan, 1000);
            this.setState({ intervalIsSet: interval });
          }
    }

    componentWillUnmount() {
        if (this.state.intervalIsSet) {
          clearInterval(this.state.intervalIsSet);
          this.setState({ intervalIsSet: null });
        }
    }
  
   
    render() {
        const plans = this.state.plans;
        const { classes } = this.props;
        const options = {
          weekday: "short",
          day:"2-digit"}
        
        return (
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <Container maxWidth="sm" className={classes.center}> 
                <ul>
                  { plans.length <= 0
                  ? '🥣'
                  : plans.map((planN) => (
                      <li key={planN.id} className={classes.list}> 
                        <button>
                            <span>{ (new Date(planN.dateP)).toLocaleDateString('en-US', options).split(' ')[1] }
                            </span>
                            <br></br>                            
                            <span>{ (new Date(planN.dateP)).toLocaleDateString('en-US', options).split(' ')[0] }
                            </span>
                        </button> 
                      </li>
                  ))}
                </ul> 
                </Container>
            </Toolbar>
          </AppBar> 
            
        );
    }
}     
    
export default withStyles(styles)(TopNavBar);
  