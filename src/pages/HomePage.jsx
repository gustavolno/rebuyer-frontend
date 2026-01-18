import React, { useEffect, useState } from 'react';
import { MapPin, Calendar, Tag, Ticket, AlertCircle, X, User, CheckCircle2 } from 'lucide-react';

const HomePage = () => {
  const [ingressos, setIngressos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [eventos, setEventos] = useState([]); // <--- NOVO: Lista de Eventos
  
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  // Estados do Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [ingressoSelecionado, setIngressoSelecionado] = useState(null);
  const [compradorId, setCompradorId] = useState("");
  const [processandoCompra, setProcessandoCompra] = useState(false);

  const API_URL = "https://rebuyer-backend.onrender.com"; 

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = () => {
    setLoading(true);
    // Buscamos TUDO de uma vez: Ingressos, Usuários e Eventos
    Promise.all([
        fetch(`${API_URL}/ingressos/`).then(res => res.json()),
        fetch(`${API_URL}/usuarios/`).then(res => res.json()),
        fetch(`${API_URL}/eventos/`).then(res => res.json()) // <--- NOVO FETCH
    ])
    .then(([ingressosData, usuariosData, eventosData]) => {
        setIngressos(Array.isArray(ingressosData) ? ingressosData : []);
        setUsuarios(Array.isArray(usuariosData) ? usuariosData : []);
        setEventos(Array.isArray(eventosData) ? eventosData : []); // <--- SALVA EVENTOS
        setLoading(false);
    })
    .catch(error => {
        console.error("Erro ao carregar:", error);
        setErro("Não foi possível carregar a vitrine.");
        setLoading(false);
    });
  };

  // Função auxiliar para encontrar os dados do evento pelo ID
  const getDetalhesEvento = (eventoId) => {
    const evento = eventos.find(e => e.id === eventoId);
    if (!evento) return { nome: `Evento #${eventoId}`, local: "Carregando...", data: "..." };
    
    // Formata a data (ex: 2026-09-20T19:00 -> 20/09/2026 às 19:00)
    const dataObj = new Date(evento.data_evento);
    const dataFormatada = dataObj.toLocaleDateString('pt-BR');
    const horaFormatada = dataObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    return { 
        nome: evento.nome, 
        local: evento.local, 
        data: `${dataFormatada} às ${horaFormatada}` 
    };
  };

  const abrirModalCompra = (ingresso) => {
    setIngressoSelecionado(ingresso);
    setModalOpen(true);
  };

  const confirmarCompra = async () => {
    if (!compradorId) {
        alert("Por favor, selecione quem está comprando!");
        return;
    }

    setProcessandoCompra(true);

    try {
        const response = await fetch(`${API_URL}/comprar/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ingresso_id: ingressoSelecionado.id,
                comprador_id: parseInt(compradorId)
            })
        });

        if (response.ok) {
            alert("✅ Compra realizada com sucesso! O ingresso é seu.");
            setModalOpen(false);
            setCompradorId("");
            carregarDados();
        } else {
            const errorText = await response.json();
            alert(`Erro: ${errorText.detail || "Falha na compra"}`);
        }
    } catch (error) {
        alert("Erro de conexão ao tentar comprar.");
    } finally {
        setProcessandoCompra(false);
    }
  };

  if (loading) {
    return (
        <div className="flex justify-center items-center h-screen text-primary flex-col gap-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="animate-pulse">Carregando vitrine...</p>
        </div>
    );
  }

  return (
    <div className="pt-24 pb-12 max-w-6xl mx-auto px-4 relative">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark">
          Ingressos Disponíveis
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Compre ingressos de fãs verificados de forma segura e rápida.
        </p>
      </header>

      {ingressos.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
          <Ticket className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700">Nenhum ingresso à venda.</h2>
          <p className="text-gray-500 mt-2">A vitrine está vazia no momento.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ingressos.map((ingresso) => {
            // Aqui buscamos os dados reais do evento para cada card
            const detalhes = getDetalhesEvento(ingresso.evento_id);

            return (
              <div key={ingresso.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col justify-between group">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-primary transition-colors" title={detalhes.nome}>
                       {detalhes.nome}
                    </h3>
                    <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                      {ingresso.status}
                    </span>
                  </div>
                  
                  <div className="space-y-3 text-gray-600 mb-6">
                    <div className="flex items-center gap-2">
                      <Tag className="h-5 w-5 text-primary" />
                      <span className="font-medium">{ingresso.setor}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="h-4 w-4" />
                      <span>{detalhes.local}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                       <span>{detalhes.data}</span>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">Preço</p>
                    <p className="text-2xl font-bold text-gray-900">
                      R$ {ingresso.preco?.toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                  <button 
                      onClick={() => abrirModalCompra(ingresso)}
                      className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-xl transition-all active:scale-95 shadow-md hover:shadow-lg"
                  >
                    Comprar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* --- MODAL DE COMPRA --- */}
      {modalOpen && ingressoSelecionado && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in">
                <div className="bg-primary p-4 flex justify-between items-center text-white">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5" /> Confirmar Compra
                    </h3>
                    <button onClick={() => setModalOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>
                
                <div className="p-6">
                    <div className="bg-gray-50 p-4 rounded-xl mb-6 border border-gray-100">
                        <p className="text-sm text-gray-500 mb-1">Você está comprando:</p>
                        {/* Agora o Modal também mostra o nome real */}
                        <p className="font-bold text-gray-900 text-lg">
                            {getDetalhesEvento(ingressoSelecionado.evento_id).nome}
                        </p>
                        <p className="text-gray-600 text-sm">Setor: {ingressoSelecionado.setor}</p>
                        <p className="text-primary font-bold text-xl mt-2">
                            R$ {ingressoSelecionado.preco?.toFixed(2).replace('.', ',')}
                        </p>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Quem é você?</label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <select 
                                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none appearance-none"
                                value={compradorId}
                                onChange={(e) => setCompradorId(e.target.value)}
                            >
                                <option value="">Selecione o comprador...</option>
                                {usuarios.map(u => (
                                    <option key={u.id} value={u.id}>{u.nome}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button 
                        onClick={confirmarCompra}
                        disabled={processandoCompra}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {processandoCompra ? "Processando..." : "Confirmar Pagamento"}
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;