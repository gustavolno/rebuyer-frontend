import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarPlus, MapPin, Calendar } from 'lucide-react';

const AdminEventosPage = () => {
  const navigate = useNavigate();
  const API_URL = "https://rebuyer-backend.onrender.com";
  
  const [form, setForm] = useState({
    nome: '',
    local: '',
    data_evento: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Converter data para formato ISO que o Python aceita
    const dataFormatada = new Date(form.data_evento).toISOString();

    await fetch(`${API_URL}/eventos/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, data_evento: dataFormatada })
    });

    alert("Evento criado com sucesso!");
    navigate('/vitrine');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8 flex justify-center">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl max-w-lg w-full h-fit border border-gray-100 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <CalendarPlus className="text-primary" /> Novo Evento
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Nome do Show</label>
            <input required type="text" placeholder="Ex: Rock in Rio 2026" 
              className="w-full p-3 bg-gray-50 dark:bg-gray-700 border rounded-xl dark:text-white"
              value={form.nome} onChange={e => setForm({...form, nome: e.target.value})} />
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Local</label>
            <div className="relative">
                <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input required type="text" placeholder="Ex: Allianz Parque" 
                className="w-full pl-10 p-3 bg-gray-50 dark:bg-gray-700 border rounded-xl dark:text-white"
                value={form.local} onChange={e => setForm({...form, local: e.target.value})} />
            </div>
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Data</label>
            <div className="relative">
                <Calendar className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input required type="datetime-local" 
                className="w-full pl-10 p-3 bg-gray-50 dark:bg-gray-700 border rounded-xl dark:text-white"
                value={form.data_evento} onChange={e => setForm({...form, data_evento: e.target.value})} />
            </div>
          </div>

          <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl mt-4">
            Cadastrar Evento
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminEventosPage;