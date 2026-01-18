import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import VenderPage from './pages/VenderPage';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './context/AuthContext'; // <--- Importante

function App() {
  return (
    <AuthProvider> {/* O site inteiro agora tem acesso ao usuário e tema */}
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/vender" element={<VenderPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;