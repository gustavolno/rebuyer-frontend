import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import VenderPage from './pages/VenderPage';
import LoginPage from './pages/LoginPage';
import CadastroPage from './pages/CadastroPage';
import RotaProtegida from './components/RotaProtegida';
import AdminEventosPage from './pages/AdminEventosPage';
import MeusIngressosPage from './pages/MeusIngressosPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
          {/* Navbar aparece em todas, mas ela se adapta se não tiver logado */}
          <Navbar />
          
        <Routes>
            {/* --- ROTAS PÚBLICAS (Qualquer um acessa) --- */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/cadastro" element={<CadastroPage />} />
            
            {/* AGORA A VITRINE É PÚBLICA (Não pede login) */}
            <Route path="/vitrine" element={<HomePage />} />


            {/* --- ROTAS PROTEGIDAS (Só logado) --- */}
            <Route path="/meus-ingressos" element={
                <RotaProtegida>
                    <MeusIngressosPage />
                </RotaProtegida>
            } />

            <Route path="/admin-eventos" element={
                <RotaProtegida>
                    <AdminEventosPage />
                </RotaProtegida>
            } />
            
            <Route path="/vender" element={
                <RotaProtegida>
                    <VenderPage />
                </RotaProtegida>
            } />
      </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;