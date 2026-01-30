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

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
          {/* Navbar aparece em todas, mas ela se adapta se não tiver logado */}
          <Navbar />
          
          <Routes>
            {/* Rotas Públicas */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/cadastro" element={<CadastroPage />} />

            {/* Rotas Privadas (Só entra com Login) */}
            <Route 
              path="/vitrine" 
              element={
                <RotaProtegida>
                  <HomePage />
                </RotaProtegida>
              } 
            />

            <Route 
              path="/admin-eventos" element={
                <RotaProtegida>
                    <AdminEventosPage />
                </RotaProtegida>
            } />
            
            <Route 
              path="/vender" 
              element={
                <RotaProtegida>
                  <VenderPage />
                </RotaProtegida>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;