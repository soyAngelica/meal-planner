import React, { Component } from 'react';
import axios from 'axios';


// esto debe ir dentro de la función que se desata al dar click en el botón //

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


class Generate extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          disabled: false,
          title: '',
          description: '',
        };
    }

    render() {
        return (
            <button
                className="btn btn-primary"
                onClick={() => {this.submit()}}>
                Generar nuevo Menú
            </button>
        )
    }
        
        //     this.submitAnswer = this.submitAnswer.bind(this);
        // }
        
        // async componentDidMount() {
        //     await this.refreshQuestion();
        // }
        
        // // SE DE QUE VA, PERO NO LO ENTIENDO //
        // async refreshQuestion() {
        //     const { match: { params } } = this.props;
        //     const question = (await axios.get(`http://localhost:8081/${params.questionId}`)).data;
        //     this.setState({
        //     question,
        //     });
        // }

}

export default Generate;