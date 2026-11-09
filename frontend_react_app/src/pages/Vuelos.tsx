import React from 'react'
import {useLocation} from 'react-router-dom';
import { SearchParams } from '../types';

const Vuelos: React.FC = () => {
  const location= useLocation();

  const paramBusqueda = location.state?.parametro as SearchParams | undefined;
  
  return( 
  <>
    <div className="container">
      <div className="row">
        <h1>Vuelos disponibles</h1>
        <h4>Estos vuelos están basados en tu busqueda. Haz click en modificar para editar los parametros de busqueda.</h4>
      </div>
      <div className="row">
      {paramBusqueda && (
       <table>
          <tbody>
            <tr>
              <td>{paramBusqueda.origen}</td>
              <td>{paramBusqueda.destino}</td>
              <td>{paramBusqueda.fechaSalida}</td>
              <td>{paramBusqueda?.fechaRegreso}</td>
              <td>{paramBusqueda.pasajeros}</td>
            </tr>
          </tbody>
        </table> 
      )}
      </div>
    </div>
    
  </>
  )
}

export default Vuelos