import React from 'react';
import { Link } from 'react-router-dom';
import { Ticket, PlusCircle, LogIn, Moon, Sun, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck } from 'lucide-react';

const Navbar = () => {
  const { user, logout, theme, toggleTheme } = useAuth();

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 fixed w-full top-0 z-50 shadow-sm transition-colors">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Ticket className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark">
              Rebuyer
            </span>
          </Link>

          <div className="flex items-center gap-6">
            {/* Botão Dark Mode */}
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors">
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>

            {user ? (
              <>
                <Link to="/" className="hidden md:flex font-medium text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">
                  Vitrine
                </Link>
                
                <Link to="/vender" className="flex items-center gap-1 font-medium text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">
                  <PlusCircle className="h-5 w-5" />
                  <span className="hidden md:inline">Vender</span>
                </Link>

            {user && user.is_admin && (
              <Link to="/admin-eventos" className="flex items-center gap-1 font-medium text-purple-600 dark:text-purple-400 hover:text-purple-800">
                  <ShieldCheck className="h-5 w-5" />
                  <span className="hidden md:inline">Criar Evento</span>
              </Link>
               )}

                {/* Menu do Usuário */}
                <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-700">
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-200">
                        {user.nome.split(' ')[0]}
                    </span>
                    <button 
                        onClick={logout} 
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        title="Sair"
                    >
                        <LogOut className="h-5 w-5" />
                    </button>
                </div>
              </>
            ) : (
              <Link to="/login" className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-bold transition-all text-sm">
                <LogIn className="h-4 w-4" /> Entrar
              </Link>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;