import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { UserCircle2, ArrowRight } from 'lucide-react';

const LoginPage = () => {
  const [usuarios, setUsuarios] = useState([]);
  const { login } = useAuth();
  const navigate = useNavigate();
  const API_URL = "https://rebuyer-backend.onrender.com";

  useEffect(() => {
    fetch(`${API_URL}/usuarios/`)
      .then(res => res.json())
      .then(data => setUsuarios(data))
      .catch(err => console.error(err));
  }, []);

  const handleLogin = (usuario) => {
    login(usuario);
    navigate('/'); // Manda para a Home
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-100 dark:border-gray-700">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Bem-vindo de volta</h1>
          <p className="text-gray-500 dark:text-gray-400">Escolha um perfil para entrar</p>
        </div>

        <div className="space-y-3">
          {usuarios.map(u => (
            <button
              key={u.id}
              onClick={() => handleLogin(u)}
              className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary hover:bg-indigo-50 dark:hover:bg-gray-700 dark:hover:border-primary transition-all group bg-white dark:bg-gray-800"
            >
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full text-primary">
                  <UserCircle2 className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">{u.nome}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{u.email}</p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-primary" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;