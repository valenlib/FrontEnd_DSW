import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { UsuarioSesContext } from '../context/contextos';

interface ProtectedRouteProps {
  requiredRole?: 'admin' | 'usuario';
}

const ProtectedRoute = ({ requiredRole }: ProtectedRouteProps) => {
  const context = useContext(UsuarioSesContext);

  if (!context?.usuarioSes) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && context.usuarioSes.rol !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
