import React, { Component } from 'react';
import axios from 'axios';


class Generate extends Component {

    constructor(props) {
        super(props); 
        this.state  = {
            dataF: [],
            plans: [],
        };
        this.generate = this.generate.bind(this);
    }
   
    getDataPlan = () => {
        fetch('http://localhost:3001/meals/getPlans')
        .then((plans) => plans.json())
        .then((res) => this.setState({ plans: res.plans }))
        .catch(function(error) {
            console.log(error.message);
        });
    };


    getDataRandom = () => {
        fetch('http://localhost:3001/meals/getRandom')
        .then((dataF) => dataF.json())
        .then((res) => this.setState({ dataF: res.dataF }));
    };

    putDataToDB = (id, dateP, breakfast) => {
        console.log(`${id}, ${dateP}, ${breakfast}`)
        axios.post('http://localhost:3001/meals/putDataPlan', {
            // id: idToBeAdded,
            dateP: dateP,
            breakfast: breakfast
        });
    };

  
    componentDidMount() {
        this.getDataRandom();
        this.getDataPlan();
        let currentId = (this.state.plans.map((plans) => plans.id)).pop();
        console.log(`putopendejo ${currentId}`);
    }

     generate() {    

        console.log('generate');

        this.getDataRandom();
        this.getDataPlan();

        const dataF = this.state.dataF;
        const plans = this.state.plans;
        let currentId = (this.state.plans.map((plans) => plans.id)).pop();

        Date.prototype.addDays = function(days) {
        var dat = new Date(this.valueOf())
        dat.setDate(dat.getDate() + days);
        return dat;
        }
        
        function getDates(startDate, stopDate) {
            var dateArray = new Array();
            var currentDate = startDate;
            while (currentDate <= stopDate) {
                var day = currentDate.getDate()
                var month = currentDate.getMonth()+1
                var year = currentDate.getFullYear()
                dateArray.push(year+"/"+month+"/"+day )
                currentDate = currentDate.addDays(1);
            }
            return dateArray;
        }
        
        var dateArray = getDates((new Date()).addDays(1), (new Date()).addDays(7));

        const items = [];

        for (var i = 0; i < 7; ++i) {  
            ++currentId
            items.push({ 
                id: currentId,
                dateP: dateArray[i],
                breakfast:  dataF[i].id
            }) 
        }

        const planN = items.map((planN) => {
            this.putDataToDB(planN.id, planN.dateP, planN.breakfast)
        });
    }

    render() {
        return (
            <button
                className="btn btn-primary"
                onClick={this.generate}>
                Generar nuevo Menú
            </button>
        )
    }
}

export default Generate;