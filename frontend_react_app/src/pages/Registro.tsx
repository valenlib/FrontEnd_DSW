import React from 'react'
import RegistroComp from '../components/Registrarse'
import { Link } from "react-router-dom"

const Registro: React.FC = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <RegistroComp />
        </div>
      </div>
    </>
  )
}

export default Registro
