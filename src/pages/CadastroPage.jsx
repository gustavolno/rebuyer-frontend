import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, Phone, Wallet, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';

const CadastroPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  
  // Se estiver rodando local, use localhost
  const API_URL = "https://rebuyer-backend.onrender.com"; 

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '', // Novo campo (só no frontend)
    telefone: '',
    pix_chave: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 1. Validação de Senha
    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem!");
      setLoading(false);
      return;
    }

    try {
      // 2. Removemos o campo 'confirmarSenha' antes de enviar para o Backend
      // O Backend não espera receber esse campo, ele só quer a 'senha' real.
      const { confirmarSenha, ...dadosParaEnviar } = formData;

      const response = await fetch(`${API_URL}/usuarios/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosParaEnviar)
      });

      if (response.ok) {
        const novoUsuario = await response.json();
        login(novoUsuario);
        alert(`Bem-vindo(a), ${novoUsuario.nome}!`);
        navigate('/vitrine'); 
      } else {
        const error = await response.json();
        alert(`Erro: ${error.detail || "Falha ao criar conta"}`);
      }
    } catch (error) {
      console.error(error);
      alert("Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-6 transition-colors">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl max-w-lg w-full border border-gray-100 dark:border-gray-700">
        
        {/* Cabeçalho */}
        <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" /> Voltar para Login
        </Link>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Crie sua conta</h1>
          <p className="text-gray-500 dark:text-gray-400">Preencha seus dados para começar.</p>
        </div>

        {/* Formulário com espaçamento maior (space-y-5) */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Nome */}
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 ml-1">Nome Completo</label>
            <div className="relative">
              <User className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <input 
                required type="text" placeholder="Ex: Gustavo Silva"
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white transition-all"
                value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})}
              />
            </div>
          </div>
          
          {/* Email */}
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 ml-1">E-mail</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <input 
                required type="email" placeholder="seu@email.com"
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white transition-all"
                value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          {/* Grid para Senhas (lado a lado em telas grandes, empilhado em celular) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 ml-1">Senha</label>
                <div className="relative">
                <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <input 
                    required type="password" placeholder="******"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white transition-all"
                    value={formData.senha} onChange={e => setFormData({...formData, senha: e.target.value})}
                />
                </div>
            </div>
            <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 ml-1">Confirmar</label>
                <div className="relative">
                <CheckCircle className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <input 
                    required type="password" placeholder="Repita a senha"
                    className={`w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border rounded-xl focus:ring-2 outline-none dark:text-white transition-all ${
                        formData.confirmarSenha && formData.senha !== formData.confirmarSenha 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-200 dark:border-gray-600 focus:ring-primary'
                    }`}
                    value={formData.confirmarSenha} onChange={e => setFormData({...formData, confirmarSenha: e.target.value})}
                />
                </div>
            </div>
          </div>

          {/* Grid para Contato */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 ml-1">Telefone</label>
                <div className="relative">
                <Phone className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <input 
                required type="text" placeholder="(11) 99999-9999"
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white transition-all"
                value={formData.telefone} onChange={e => setFormData({...formData, telefone: e.target.value})}
                />
                </div>
            </div>
            <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 ml-1">Chave Pix</label>
                <div className="relative">
                <Wallet className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <input 
                required type="text" placeholder="CPF ou Email"
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white transition-all"
                value={formData.pix_chave} onChange={e => setFormData({...formData, pix_chave: e.target.value})}
                />
                </div>
            </div>
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full mt-6 bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-95 flex justify-center items-center gap-2 text-lg"
          >
            {loading ? <Loader2 className="animate-spin h-6 w-6" /> : "Finalizar Cadastro"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CadastroPage;