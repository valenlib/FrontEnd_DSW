import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import type {Usuario} from '../types'

const loginComp: React.FC = () => {
    return (
    <>
        <form className="container">
            <div className="row">
                <h2>Inicio de Sesion</h2>
                <p>Utiliza tu Email para iniciar sesion</p>
            </div>
            <div className="row">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
            </div>
            <div className="row">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input type="password" className="form-control" id="password" />
            </div>
            <div className="row">
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
    </>
    )
}

export default loginComp