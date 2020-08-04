import React from 'react';
import {Button} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import MUIDataTable from "mui-datatables";

class vistaVto extends React.Component {
state = { dataKey: null, postulados:[]};

  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.Votacion;  
      var c={};
      drizzle.contracts.Votacion.methods.numero_candidatos().call().then(value=>{
        for(var i=1 ; i<=value;i++){            
          drizzle.contracts.Votacion.methods.candidatos(i).call().then(candidato=>{
            c = new Object();
             c ={
              id :candidato.id,
              nombre: candidato.nombre,
              votos: candidato.cantidad_votos
            }
            this.setState(prevState => ({
              postulados: [...prevState.postulados, c]
            }))           
          })           
          c = new Object();
         }              
       })  
  }
  render() {      
    const { Votacion } = this.props.drizzleState.contracts;
    const { drizzle } = this.props;
    console.log(this.state.dataKey);   
    console.log(this.state.postulados);     
    const columns = [
      {
       name: "id",
       label: "Id",
       options: {
        filter: true,
        sort: true,
       }
      },
      {
       name: "nombre",
       label: "Nombre",
       options: {
        filter: true,
        sort: false,
       }
      },
      {
       name: "votos",
       label: "Cantidad De votos",
       options: {
        filter: true,
        sort: false,
       }
      }
     ];
      const options = {
        filterType: 'checkbox',
      };
    return (
      <div>
       <MUIDataTable
        title={"candidatos"}
        data={this.state.postulados}
        columns={columns}
        options={options}
      />
      </div>
    );
  }
}
export default vistaVto;