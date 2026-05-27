import React from 'react'
import Header from './components/Header'
import BusquedaVuelo from './components/BusquedaVuelo'
import Footer from './components/Footer'
import Home from './pages/Home'
import Editar from './pages/Editar'
import Registro from './pages/Registro'
import Login from './pages/Login'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import type { SearchParams } from './types'

const App: React.FC = () => {
  const handleSearch = (params: SearchParams) => {
    console.log('Búsqueda de vuelos:', params)
  }

  return (
  <Router>
    <div className="container-fluid">
      <div className="row">
        <div className="col d-flex justify-content-end">
          <Header />
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/busqueda" element={<BusquedaVuelo onSearch={handleSearch} />} />
        <Route path="/editar" element={<Editar />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  </Router>
)
}

export default App
