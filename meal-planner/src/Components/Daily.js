import React, { Component } from 'react';
import axios from 'axios';



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

            <div>  

                <div>Here goes the calendar</div>

                <ul>
                    {plans.length <= 0
                    ? 'NO DB ENTRIES YET'
                    : plans.map((planN) => (
                        <li style={{ padding: '10px' }} key={planN.id}>
                            <span style={{ color: 'gray' }}> Fecha: {planN.dateP} </span> <br />
                            <span style={{ color: 'gray' }}> Desayuno: {planN.breakfast.nombre} </span> <br />
                            <span style={{ color: 'gray' }}> Comida: {planN.lunch.nombre} </span> <br />
                            <span style={{ color: 'gray' }}> Cena: {planN.dinner.nombre} </span> <br />

                        </li>
                        ))}
                </ul>

            </div>  

            // const planN = items.map((this.state.plan) => {
            //     console.log(`${planN.id}, ${planN.dateP}, ${planN.breakfast},${planN.lunch},${planN.dinner}`)
            // });
        )
    }
}

export default Daily;