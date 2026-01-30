import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // O estado de carregamento evita que a tela pisque "Login" antes de ler a memória
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    // 1. Assim que o site abre, olhamos no navegador
    const savedUser = localStorage.getItem('rebuyer_user');
    
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Erro ao ler usuário salvo", error);
        localStorage.removeItem('rebuyer_user'); // Se estiver corrompido, limpa
      }
    }
    setLoading(false); // Terminou de carregar
  }, []);

  const login = (userData) => {
    setUser(userData);
    // 2. Salva no navegador para sobreviver ao F5
    localStorage.setItem('rebuyer_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rebuyer_user');
    window.location.href = "/"; // Força o redirecionamento
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children} {/* Só mostra o site depois de verificar o login */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);