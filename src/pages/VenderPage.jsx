import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // <--- Importamos o Auth
import { Ticket, DollarSign, MapPin } from 'lucide-react';

const VenderPage = () => {
  const { user } = useAuth(); // <--- Pegamos o usuário logado aqui
  const navigate = useNavigate();
  const API_URL = "https://rebuyer-backend.onrender.com";

  const [eventos, setEventos] = useState([]);
  const [form, setForm] = useState({
    evento_id: '',
    setor: '',
    preco: ''
  });

  useEffect(() => {
    fetch(`${API_URL}/eventos/`).then(res => res.json()).then(setEventos);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dadosParaEnviar = {
        ...form,
        vendedor_id: user.id, // <--- O SEGREDO: Usamos o ID do usuário logado automaticamente!
        evento_id: parseInt(form.evento_id),
        preco: parseFloat(form.preco)
    };

    const response = await fetch(`${API_URL}/ingressos/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dadosParaEnviar)
    });

    if (response.ok) {
      alert("Ingresso anunciado com sucesso!");
      navigate('/vitrine');
    } else {
      alert("Erro ao anunciar.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8 flex justify-center">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Vender Ingresso</h1>
        
        {/* Aviso visual de quem está vendendo */}
        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-xl mb-6 text-blue-700 dark:text-blue-200 text-sm">
            Logado como: <strong>{user.nome}</strong>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg space-y-4 border border-gray-100 dark:border-gray-700">
            {/* O resto do formulário é igual, mas REMOVEMOS o input de Vendedor ID */}
            
            <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Escolha o Evento</label>
                <select required 
                    className="w-full p-3 bg-gray-50 dark:bg-gray-700 border rounded-xl dark:text-white"
                    onChange={e => setForm({...form, evento_id: e.target.value})}>
                    <option value="">Selecione...</option>
                    {eventos.map(ev => (
                        <option key={ev.id} value={ev.id}>{ev.nome}</option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Setor</label>
                <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <input required type="text" placeholder="Ex: Pista Premium" 
                    className="w-full pl-10 p-3 bg-gray-50 dark:bg-gray-700 border rounded-xl dark:text-white"
                    onChange={e => setForm({...form, setor: e.target.value})} />
                </div>
            </div>

            <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Preço (R$)</label>
                <div className="relative">
                    <DollarSign className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <input required type="number" placeholder="0,00" 
                    className="w-full pl-10 p-3 bg-gray-50 dark:bg-gray-700 border rounded-xl dark:text-white"
                    onChange={e => setForm({...form, preco: e.target.value})} />
                </div>
            </div>

            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl mt-2 transition-all">
                Anunciar Agora
            </button>
        </form>
      </div>
    </div>
  );
};

export default VenderPage;