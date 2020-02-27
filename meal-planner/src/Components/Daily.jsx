import React, { Component } from 'react';
import axios from 'axios';
import { Grid } from '@material-ui/core';



class Daily extends Component {

    constructor(props) {
        super(props); 
        this.state  = {
            plan: [],
            intervalIsSet: false
        };
        
    }
 
    getPlan = () => {
        fetch('http://localhost:3001/meals/plans')
        .then((plan) => plan.json())
        .then((res) => this.setState({ plan: res.plan }))
        .catch(function(error) {
            console.log(error.message);
        });
    };

 
    componentDidMount() { 
        this.getPlan();
        if (!this.state.intervalIsSet) {
            let interval = setInterval(this.getPlan, 1000);
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
        const plans = this.state.plan;

        return (

            <Grid container spacing={1} disableGutters={false}> 

                <div>Here goes the calendar</div>

                <Grid container item xs={12} spacing={3} >
                    { plans.length <= 0
                    ? 'NO DB ENTRIES YET'
                    : plans.map((planN) => (


                       <li style={{ padding: '10px' }} key={planN.id}>
                            <span style={{ color: 'gray' }}> Fecha: {planN.dateP.substr(0,9)} </span> <br />
                            <span style={{ color: 'gray' }}> Desayuno: {planN.breakfast.nombre} </span> <br />
                            <span style={{ color: 'gray' }}> Comida: {planN.lunch.nombre} </span> <br />
                            <span style={{ color: 'gray' }}> Cena: {planN.dinner.nombre} </span> <br />

                        </li>
                        ))}
                </Grid>

             </Grid> 

        )
    }
}

export default Daily;