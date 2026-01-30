import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Ticket, Lock, Mail, Loader2 } from 'lucide-react';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const API_URL = "https://rebuyer-backend.onrender.com";

  const [form, setForm] = useState({ email: '', senha: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Chama a nova rota de login
      const response = await fetch(`${API_URL}/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        const usuario = await response.json();
        login(usuario); // Salva no contexto
        navigate('/vitrine'); 
      } else {
        const error = await response.json();
        alert(error.detail || "Email ou senha incorretos");
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="mb-8 text-center">
        <Ticket className="h-16 w-16 text-primary mx-auto mb-2" />
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Rebuyer</h1>
        <p className="text-gray-500 dark:text-gray-400">O marketplace seguro de ingressos</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">Acesse sua conta</h2>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input 
              required type="email" placeholder="Seu email" 
              className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white"
              value={form.email} onChange={e => setForm({...form, email: e.target.value})}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input 
              required type="password" placeholder="Sua senha" 
              className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white"
              value={form.senha} onChange={e => setForm({...form, senha: e.target.value})}
            />
          </div>

          <button 
            type="submit" disabled={loading}
            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-all shadow-md active:scale-95 flex justify-center"
          >
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Entrar"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 text-center">
          <p className="text-gray-500 text-sm mb-3">Novo por aqui?</p>
          <Link to="/cadastro" className="text-primary font-bold hover:underline">
            Criar Conta Grátis
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;