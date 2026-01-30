import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import QRCode from "react-qr-code"; // <--- A biblioteca que instalamos
import { Calendar, MapPin, Ticket, Loader2 } from 'lucide-react';

const MeusIngressosPage = () => {
  const { user } = useAuth();
  const [ingressos, setIngressos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lembre-se de trocar para https://rebuyer-backend.onrender.com antes de subir pro Render
  const API_URL = "http://localhost:8000"; 

  useEffect(() => {
    if (user) {
      fetch(`${API_URL}/usuarios/${user.id}/compras`)
        .then(res => res.json())
        .then(data => {
          setIngressos(data);
          setLoading(false);
        })
        .catch(err => console.error(err));
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2">
          <Ticket className="text-primary" /> Meus Ingressos
        </h1>

        {ingressos.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
            <p className="text-gray-500 text-lg">Você ainda não comprou nenhum ingresso.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ingressos.map((item) => (
              <div key={item.id_transacao} className="bg-white dark:bg-gray-800 rounded-3xl p-0 shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col md:flex-row">
                
                {/* Lado Esquerdo: Informações */}
                <div className="p-6 flex-1 flex flex-col justify-center">
                  <div className="mb-4">
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                      Confirmado
                    </span>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                    {item.evento}
                  </h2>
                  
                  <div className="space-y-2 text-gray-500 dark:text-gray-400 text-sm mb-6">
                    <p className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" /> 
                      {new Date(item.data).toLocaleDateString('pt-BR')} às {new Date(item.data).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" /> {item.local}
                    </p>
                    <p className="flex items-center gap-2 font-semibold text-primary">
                      <Ticket className="h-4 w-4" /> Setor: {item.setor}
                    </p>
                  </div>

                  <div className="border-t border-dashed border-gray-200 pt-4 mt-auto">
                    <p className="text-xs text-gray-400 uppercase">Valor Pago</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      R$ {item.preco.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Lado Direito: QR Code (Parte "Picotada") */}
                <div className="bg-gray-100 dark:bg-gray-900 p-6 flex flex-col items-center justify-center border-l-2 border-dashed border-gray-300 dark:border-gray-700 relative">
                  {/* Bolinhas decorativas para parecer ingresso rasgado */}
                  <div className="absolute -left-3 top-[-10px] w-6 h-6 rounded-full bg-gray-50 dark:bg-gray-900"></div>
                  <div className="absolute -left-3 bottom-[-10px] w-6 h-6 rounded-full bg-gray-50 dark:bg-gray-900"></div>
                  
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    <QRCode 
                        value={item.codigo_seguranca} 
                        size={120} 
                        fgColor="#000000"
                        bgColor="#ffffff"
                    />
                  </div>
                  <p className="text-[10px] text-gray-400 mt-3 text-center tracking-widest font-mono">
                    #{item.id_transacao}
                  </p>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MeusIngressosPage;