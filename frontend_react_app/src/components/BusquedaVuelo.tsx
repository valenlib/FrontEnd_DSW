import React, { useState } from 'react'
import '../styles/BusquedaVuelo.css'
import type { BusquedaVueloProps, SearchParams } from '../types'
import {useNavigate} from 'react-router-dom';


const BusquedaVuelo: React.FC<BusquedaVueloProps> = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    origen: '',
    destino: '',
    fechaSalida: '',
    fechaRegreso: '',
    pasajeros: 1,
  })
  const navigate = useNavigate();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.currentTarget
    setSearchParams({
      ...searchParams,
      [name]: name === 'pasajeros' ? parseInt(value, 10) : value,
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(searchParams)
    }
    console.log('Parámetros de búsqueda:', searchParams)
    navigate("/vuelos", {state: {parametro: searchParams}});
  }

  const [soloIda, setSoloIda] = useState(false);

  return (
    <div id="test">
        <form className="container" onSubmit={handleSubmit}>
          <div className="row"><h1>Búsqueda de Vuelos</h1></div>
          <div className="row">
            <label htmlFor="origen" >Origen</label>
            <input 
            id="origen" 
            type="text"
            name="origen" 
            value={searchParams.origen} 
            onChange={handleInputChange} 
            placeholder="Ciudad de origen"></input>
          </div>

          <div className="row">
            <label htmlFor="destino">Destino</label>
            <input 
            id="destino" 
            type="text" 
            name="destino" 
            value={searchParams.destino} 
            onChange={handleInputChange} 
            placeholder="Ciudad de destino"></input>
          </div>

          <div className="row">
            <div className="col">
              <input className="form-check-input" type="radio" name="checkIdaVuelta" id="soloIda" checked={soloIda} onChange={() => setSoloIda(true)}></input>
              <label htmlFor="soloIda">Solo Ida</label>
            </div>
            <div className="col">
              <input className="form-check-input" type="radio" name="checkIdaVuelta" id="idaYvuelta" checked={!soloIda} onChange={() => setSoloIda(false)}></input>
              <label htmlFor="idaYvuelta">Ida y vuelta</label>
            </div>
          </div>

          <div className ="row">
            <div className="col">
              <label htmlFor="fechaSalida">Fecha de Salida</label>
              <input 
                id="fechaSalida"
                type="date"
                name="fechaSalida"
                value={searchParams.fechaSalida}
                onChange={handleInputChange}></input>
            </div>

            <div className="col">
              <label htmlFor="fechaRegreso">Fecha de Regreso</label>
              <input 
                id="fechaRegreso"
                type="date"
                name="fechaRegreso"
                value={searchParams.fechaRegreso}
                onChange={handleInputChange}
                disabled={soloIda}></input>
            </div>
          

            <div className="col">
              <label htmlFor="pasajeros">Pasajeros</label>
              <select
                id="pasajeros"
                name="pasajeros"
                value={searchParams.pasajeros}
                onChange={handleInputChange}
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            <div className="row">
              <button type="submit">Buscar Vuelos</button>
            </div>

          </div>
        </form>
    </div>
  )
}

export default BusquedaVuelo
