import React, {useContext} from 'react'
import ReservasComp from '../components/ReservasComp';
import { UsuarioSesContext } from '../context/contextos';


const Reservas: React.FC = () => {
  const usuarioId  = useContext(UsuarioSesContext);

  return (
    <>
      <div className="container">
        <div className="row">
            <h2>Mis reservas</h2>
            {usuarioId?.usuarioSes != null && (
              <ReservasComp usuarioEmail={usuarioId.usuarioSes.email} usuarioToken={usuarioId.usuarioSes.accessToken} />
            )}
        </div>
      </div>
    </>
  )
}

export default Reservas
