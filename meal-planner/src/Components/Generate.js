import React, { Component } from 'react';
import axios from 'axios';


class Generate extends Component {

    constructor(props) {
        super(props); 
        this.state  = {
            dataF: [],
            intervalIsSet: false,
            idToDelete: null,
            idToUpdate: null,
            objectToUpdate: null,
        };
    
        this.generate = this.generate.bind(this);
    }

    getDataRandom = () => {
        fetch('http://localhost:3001/meals/getRandom')
        .then((dataF) => dataF.json())
        .then((res) => this.setState({ dataF: res.dataF }));
    };
   
    componentDidMount() {
        this.getDataRandom();
    }

     generate() {      
        console.log('generate');

        this.getDataRandom();

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
                dateArray.push(day+"/"+month+"/"+year )
                currentDate = currentDate.addDays(1);
            }
            return dateArray;
        }
        
        var dateArray = getDates((new Date()).addDays(0), (new Date()).addDays(8));
        console.log(dateArray);

        // foreach dateArray as date -> create! // 
        console.log(this.state.dataF);
        
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