import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ticket, DollarSign, MapPin, User, CalendarCheck, Loader2 } from 'lucide-react';

const VenderPage = () => {
  const navigate = useNavigate();
  const API_URL = "https://rebuyer-backend.onrender.com";

  // Estados para armazenar as listas vindas do banco
  const [eventos, setEventos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  
  // Estado do formulário
  const [formData, setFormData] = useState({
    evento_id: '',
    vendedor_id: '',
    setor: '',
    preco: ''
  });

  const [loading, setLoading] = useState(false);
  const [loadingDados, setLoadingDados] = useState(true);

  // 1. Ao abrir a página, busca Eventos e Usuários para preencher os menus
  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/eventos/`).then(res => res.json()),
      fetch(`${API_URL}/usuarios/`).then(res => res.json())
    ])
    .then(([eventosData, usuariosData]) => {
      setEventos(eventosData);
      setUsuarios(usuariosData);
      setLoadingDados(false);
    })
    .catch(err => {
      console.error("Erro ao carregar dados:", err);
      setLoadingDados(false);
    });
  }, []);

  // 2. Envia o formulário para criar o ingresso
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/ingressos/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          evento_id: parseInt(formData.evento_id),
          vendedor_id: parseInt(formData.vendedor_id),
          setor: formData.setor,
          preco: parseFloat(formData.preco)
        }),
      });

      if (response.ok) {
        // Sucesso! Volta para a Home
        alert("Ingresso anunciado com sucesso! 🚀");
        navigate('/'); 
      } else {
        alert("Erro ao anunciar. Verifique os dados.");
      }
    } catch (error) {
      console.error("Erro de conexão:", error);
      alert("Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  if (loadingDados) {
    return <div className="flex justify-center items-center h-screen text-primary animate-pulse">Carregando formulário...</div>;
  }

  return (
    <div className="pt-28 pb-12 max-w-lg mx-auto px-4">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        
        {/* Cabeçalho do Card */}
        <div className="bg-primary p-6 text-center">
          <Ticket className="w-12 h-12 text-white mx-auto mb-2 opacity-90" />
          <h2 className="text-2xl font-bold text-white">Vender Ingresso</h2>
          <p className="text-indigo-100 text-sm">Transforme seu ingresso extra em dinheiro</p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          {/* Seleção de Evento */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Qual é o evento?</label>
            <div className="relative">
              <CalendarCheck className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select 
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all appearance-none text-gray-700"
                value={formData.evento_id}
                onChange={e => setFormData({...formData, evento_id: e.target.value})}
              >
                <option value="">Selecione um evento...</option>
                {eventos.map(evento => (
                  <option key={evento.id} value={evento.id}>{evento.nome} - {evento.local}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Seleção de Vendedor (Simulando Login) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quem está vendendo?</label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select 
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all appearance-none text-gray-700"
                value={formData.vendedor_id}
                onChange={e => setFormData({...formData, vendedor_id: e.target.value})}
              >
                <option value="">Selecione seu usuário...</option>
                {usuarios.map(user => (
                  <option key={user.id} value={user.id}>{user.nome}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Setor e Preço (lado a lado) */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Setor</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input 
                  type="text" 
                  required
                  placeholder="Ex: Pista"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                  value={formData.setor}
                  onChange={e => setFormData({...formData, setor: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preço (R$)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input 
                  type="number" 
                  required
                  step="0.01"
                  placeholder="0,00"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                  value={formData.preco}
                  onChange={e => setFormData({...formData, preco: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Botão de Ação */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5" />
                Publicando...
              </>
            ) : (
              "Anunciar Ingresso"
            )}
          </button>

        </form>
      </div>
    </div>
  );
};

export default VenderPage;