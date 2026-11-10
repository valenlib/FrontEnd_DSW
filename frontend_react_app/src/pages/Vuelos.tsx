import React from 'react'
import {useLocation} from 'react-router-dom';
import { SearchParams } from '../types';
import ListadoVuelos from '../components/listadoVuelos';

const Vuelos: React.FC = () => {
  const location= useLocation();

  const paramBusqueda = location.state?.parametro as SearchParams | undefined;
  
  return( 
  <>
    <div className="container">
      <div className="row">
        <h2>Vuelos Disponibles</h2>
        <ListadoVuelos filtros={paramBusqueda} />
      </div>
    </div>
    
  </>
  )
}

export default Vuelos