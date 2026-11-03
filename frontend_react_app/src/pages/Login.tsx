import React from 'react'
import LoginComp from '../components/Login'
import { Link } from "react-router-dom"

const Login: React.FC = () => {
  return (
    <>
    <div className="container">
      <div className="row">
        <LoginComp />
      </div>
      <div className="row">
        <Link to="/Registrarse">No tienes una cuenta? clickea aquí para crear una!</Link>
      </div>
    </div>
    </>
  )
}

export default Login
