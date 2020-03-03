import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import axios from 'axios';

class Meals extends Component {


    state = {
      dataG: [],
      dataB: [],
      dataL: [],
      dataD: [],
      id: 0,
      nombre: null,
      tipo: null,
      intervalIsSet: false,
      idToDelete: null,
      idToUpdate: null,
      objectToUpdate: null,
    };
  
  
    componentDidMount() {
      
      this.getDataFromDb();
        if (!this.state.intervalIsSet) {
          let interval = setInterval(this.getDataFromDb, 1000);
          this.setState({ intervalIsSet: interval });
        }
    }
  
    componentWillUnmount() {
      if (this.state.intervalIsSet) {
        clearInterval(this.state.intervalIsSet);
        this.setState({ intervalIsSet: null });
      }
    }
  
    getDataFromDb = () => {
      fetch('http://localhost:3001/meals/getData')
      .then((dataG) => dataG.json())
      .then((res) => this.setState({ dataG: res.dataG }));

      fetch('http://localhost:3001/meals/getData')
        .then((dataB) => dataB.json())
        .then((res) => this.setState({ dataB: res.dataB }));
      
      fetch('http://localhost:3001/meals/getData')
        .then((dataL) => dataL.json())
        .then((res) => this.setState({ dataL: res.dataL }));
      
      fetch('http://localhost:3001/meals/getData')
        .then((dataD) => dataD.json())
        .then((res) => this.setState({ dataD: res.dataD }));
    };
  
  
     putDataToDB = (nombre, tipo) => {
      let currentIds = this.state.dataG.map((dataG) => dataG.id);
      let idToBeAdded = 0;
      while (currentIds.includes(idToBeAdded)) {
        ++idToBeAdded;
      }
  
      axios.post('http://localhost:3001/meals/putData', {
        id: idToBeAdded,
        nombre: nombre,
        tipo: tipo
      });
    };
  
  
    deleteFromDB = (idTodelete) => {
      parseInt(idTodelete);
      this.state.dataG.forEach((dat) => {
        if (dat.id === idTodelete) {
          idTodelete = dat.id;
        }
      });
  
      axios.delete('http://localhost:3001/meals/deleteData', {
        data: {
          id: idTodelete,
        },
      });
    };
  
  
    updateDB = (idToUpdate, updateNombre, updateTipo) => {
      console.log(`${idToUpdate},${updateNombre},${updateTipo}`);
      parseInt(idToUpdate);
      this.state.dataG.forEach((dat) => {
        if (dat.id === idToUpdate) {
          idToUpdate = dat.id;
        }
      });
      axios.post('http://localhost:3001/meals/updateData', {
        id: idToUpdate,
        updateNombre: updateNombre,
        updateTipo : updateTipo
      });
    };
  
    render() {
      const  { dataG } = this.state;
      const { dataB } = this.state;
      const { dataL } = this.state;
      const { dataD } = this.state;
      

      return (
       
        <div>
            
  
          <h2>Breakfast</h2>
          <ul>
            {dataB.length <= 0
              ? 'NO DB ENTRIES YET'
              : dataB.map((dat) => (
                  <li style={{ padding: '10px' }} key={dat.id}>
                    <span style={{ color: 'gray' }}> {dat.id} </span>
                    {dat.nombre}<br />
                  </li>
                ))}
          </ul>

          <h2>Lunch</h2>
          <ul>
            {dataL.length <= 0
              ? 'NO DB ENTRIES YET'
              : dataL.map((dat) => (
                  <li style={{ padding: '10px' }} key={dat.id}>
                    <span style={{ color: 'gray' }}> {dat.id} </span>
                    {dat.nombre}<br />
                  </li>
                ))}
          </ul>

          <h2>Dinner</h2>
          <ul>
            {dataD.length <= 0
              ? 'NO DB ENTRIES YET'
              : dataD.map((dat) => (
                  <li style={{ padding: '10px' }} key={dat.id}>
                    <span style={{ color: 'gray' }}> {dat.id} </span>
                    {dat.nombre}<br />
                  </li>
                ))}
          </ul> 
  
          <h4>AÑADE</h4>
          <div style={{ padding: '10px' }}>
            <input
              type="text"
              onChange={(e) => this.setState({ nombre: e.target.value })}
              placeholder="Nombre"
              style={{ width: '200px' }}
            />
            <input
              type="text"
              onChange={(e) => this.setState({ tipo: e.target.value })}
              placeholder="Tipo"
              style={{ width: '200px' }}
            />
            <button onClick={() => this.putDataToDB(this.state.nombre, this.state.tipo )}>
              ADD
            </button>
          </div>
  
          <h4>BORRA</h4>
          <div style={{ padding: '10px' }}>
            <input
              type="text"
              style={{ width: '200px' }}
              onChange={(e) => this.setState({ idToDelete: e.target.value })}
              placeholder="put id of item to delete here"
            />
            <button onClick={() => this.deleteFromDB(this.state.idToDelete)}>
              DELETE
            </button>
          </div>
  
  
          {/* update  */}
          <div style={{ padding: '10px' }}>
            <input
              type="text"
              style={{ width: '200px' }}
              onChange={(e) => this.setState({ idToUpdate: e.target.value })}
              placeholder="escribe el id"
            />
            <input
              type="text"
              style={{ width: '200px' }}
              onChange={(e) => this.setState({ updateNombre: e.target.value })}
              placeholder="Actualiza Nombre"
            />
            <input
              type="text"
              style={{ width: '200px' }}
              onChange={(e) => this.setState({ updateTipo: e.target.value })}
              placeholder="Actualiza tipo"
            />
            <button
              onClick={() =>
                this.updateDB(this.state.idToUpdate, this.state.updateNombre, this.state.updateTipo )
              }
            >
              UPDATE
            </button>
          </div>
        </div>
      );
    }
  }
  
  export default Meals;