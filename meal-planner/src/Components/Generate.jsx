import React, { Component } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles(theme => ({
    iconGenerate: {
        fontSize: 48,
        textAlign: 'center',
        display: 'block',
        margin: '0 auto',
        position: 'relative',
        top: '-7px',
    },
    GenterateContent: {
        cursor: 'pointer',
        margin: '0 auto',
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 100,
        padding:'17px 15px',
        position: 'absolute',
        left: '42%',
        top: '-60px',
        '& span': {
            fontFamily: "'Roboto'",
            fontSize: 14,
            textAlign: 'center',
            display:'block',
            margin: '0 auto',
            position: 'relative',
            top: '-5px'
        }
    }

}));



function Gen() {
    const classes = useStyles();
    return (
        <div className={classes.GenterateContent}>
            <FlashOnIcon className={classes.iconGenerate}  />
            <span>New Menú!</span>
        </div>
    )
}


class Generate extends Component {
    constructor(props) {
        super(props); 
        this.state  = {
            dataF: [],
            dataL: [],
            dataD: [],
            plans: [],
        };
        this.generate = this.generate.bind(this);
    }

    componentDidMount() {
        this.getDataRandom();
        this.getDataRandomL();
        this.getDataRandomD();
        this.getDataPlan();    
        let currentId = (!(this.state.plans.map((plans) => plans.id)).pop())?'0':(this.state.plans.map((plans) => plans.id)).pop();
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


    getDataRandomL = () => {
        fetch('http://localhost:3001/meals/getRandomL')
        .then((dataL) => dataL.json())
        .then((res) => this.setState({ dataL: res.dataL }));
    };

    getDataRandomD = () => {
        fetch('http://localhost:3001/meals/getRandomD')
        .then((dataD) => dataD.json())
        .then((res) => this.setState({ dataD: res.dataD }));
    };


    getPlan = () => {
        fetch('http://localhost:3001/meals/plans')
        .then((plan) => plan.json())
        .then((res) => console.log(res.plan));
    };


    putDataToDB = (id, dateP, breakfast, lunch, dinner) => {
        axios.post('http://localhost:3001/meals/putDataPlan', {
            id: id,
            dateP: dateP,
            breakfast: breakfast,
            lunch: lunch, 
            dinner: dinner
        });
    };

    generate() {    
        this.getDataRandom();
        this.getDataRandomL();
        this.getDataRandomD();
        this.getDataPlan();
        const dataF = this.state.dataF;
        const dataL = this.state.dataL;
        const dataD = this.state.dataD;
        const plans = this.state.plans;
        let currentId = (!(this.state.plans.map((plans) => plans.id)).pop())?'0':(this.state.plans.map((plans) => plans.id)).pop();

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
                breakfast:  dataF[i]._id,
                lunch:  dataL[i]._id,
                dinner:  dataD[i]._id,

            }) 
        }

        const planN = items.map((planN) => {
            this.putDataToDB(planN.id, planN.dateP, planN.breakfast,planN.lunch,planN.dinner)
            console.log(planN);
        });
    }
        
    render() {
        return (
            <div onClick={this.generate}>
                <Gen />                
            </div>
        )
    }
}

    

 export default Generate
