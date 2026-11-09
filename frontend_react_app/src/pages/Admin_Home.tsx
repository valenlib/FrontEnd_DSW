import React, { useState } from 'react'
import Admin_Usuarios from '../components/Admin_Usuarios';
import Admin_Aeropuertos from '../components/Admin_Aeropuertos';
import Admin_Vuelos from '../components/Admin_Vuelos';

const Admin_Home: React.FC = () => {
  
  const [estadoComp, setEstadoComp] = useState('home')

  return (
    <>
      { estadoComp==='home' && (
      <div className="container">
        <div className="row">
          <h2> Administración del Sitio Web</h2>
        </div>
        <div className="row">
          <button onClick={()=>setEstadoComp('usuario')}>Administración de Usuarios</button>
        </div>
        <div className="row">
          <button onClick={()=>setEstadoComp('aeropuerto')}>Administración de Aeropuertos</button>
        </div>
        <div className="row">
          <button onClick={()=>setEstadoComp('vuelo')}>Administración de Vuelos</button>
        </div>
      </div>
      )}
      { estadoComp==='usuario' && (
        <div className='container'>
          <div className = 'row'>
            <button onClick={()=>setEstadoComp('home')}> Volver a seleccion de controles</button>
          </div>
          <div className='row'>
            <Admin_Usuarios />
          </div>
        </div>
      )}
      { estadoComp==='aeropuerto' && ( 
        <div className="container">
          <div className="row">
            <button onClick={()=>setEstadoComp('home')}> Volver a seleccion de controles</button>
          </div>
          <div className="row">
            <Admin_Aeropuertos />
          </div>
        </div>
      )}

      { estadoComp==='vuelo' && ( 
        <div className="container">
          <div className="row">
            <button onClick={()=>setEstadoComp('home')}> Volver a seleccion de controles</button>
          </div>
          <div className="row">
            <Admin_Vuelos />
          </div>
        </div>
      )}
    </>
  )
}

export default Admin_Home