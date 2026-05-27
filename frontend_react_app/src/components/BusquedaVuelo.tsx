import React, { useState } from 'react'
import '../styles/BusquedaVuelo.css'
import type { BusquedaVueloProps, SearchParams } from '../types'

const BusquedaVuelo: React.FC<BusquedaVueloProps> = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    origen: '',
    destino: '',
    fechaSalida: '',
    fechaRegreso: '',
    pasajeros: 1,
  })

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
  }

  return (
    <div id="test">
      <h1>Búsqueda de Vuelos</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="origen">Origen:</label>
          <input
            id="origen"
            type="text"
            name="origen"
            value={searchParams.origen}
            onChange={handleInputChange}
            placeholder="Ciudad de origen"
          />
        </div>
        <div>
          <label htmlFor="destino">Destino:</label>
          <input
            id="destino"
            type="text"
            name="destino"
            value={searchParams.destino}
            onChange={handleInputChange}
            placeholder="Ciudad de destino"
          />
        </div>
        <div>
          <label htmlFor="fechaSalida">Fecha de Salida:</label>
          <input
            id="fechaSalida"
            type="date"
            name="fechaSalida"
            value={searchParams.fechaSalida}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="fechaRegreso">Fecha de Regreso (opcional):</label>
          <input
            id="fechaRegreso"
            type="date"
            name="fechaRegreso"
            value={searchParams.fechaRegreso}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="pasajeros">Pasajeros:</label>
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
        <button type="submit">Buscar Vuelos</button>
      </form>
    </div>
  )
}

export default BusquedaVuelo
