import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RotaProtegida = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // Se não tem usuário, manda para o Login (raiz)
    return <Navigate to="/" replace />;
  }

  // Se tem usuário, libera o acesso
  return children;
};

export default RotaProtegida;