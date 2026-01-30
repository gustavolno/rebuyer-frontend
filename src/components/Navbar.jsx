import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Ticket, LogOut, Store, PlusCircle, ShieldCheck } from 'lucide-react'; // Importe os ícones que usar

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md px-6 py-4 flex justify-between items-center transition-colors">
      
      {/* Logo */}
      <Link to={user ? "/vitrine" : "/"} className="flex items-center gap-2 text-2xl font-bold text-primary">
        <Ticket className="h-8 w-8" />
        <span>Rebuyer</span>
      </Link>

      {/* Menu - SÓ APARECE SE TIVER LOGADO */}
      {user && (
        <div className="flex items-center gap-6">
            
            {/* Vitrine (Só aparece logado) */}
            <Link to="/vitrine" className="flex items-center gap-1 font-medium text-gray-600 dark:text-gray-300 hover:text-primary">
                <Store className="h-5 w-5" />
                <span className="hidden md:inline">Vitrine</span>
            </Link>

            {/* Vender */}
            <Link to="/vender" className="flex items-center gap-1 font-medium text-gray-600 dark:text-gray-300 hover:text-primary">
                <PlusCircle className="h-5 w-5" />
                <span className="hidden md:inline">Vender</span>
            </Link>

            {/* Meus Ingressos */}
            <Link to="/meus-ingressos" className="flex items-center gap-1 font-medium text-gray-600 dark:text-gray-300 hover:text-primary">
                <Ticket className="h-5 w-5" />
                <span className="hidden md:inline">Meus Ingressos</span>
            </Link>

            {/* Admin (Só se for admin) */}
            {user.is_admin && (
                <Link to="/admin-eventos" className="flex items-center gap-1 font-medium text-purple-600 dark:text-purple-400 hover:text-purple-800">
                    <ShieldCheck className="h-5 w-5" />
                    <span className="hidden md:inline">Criar Evento</span>
                </Link>
            )}

            {/* Logout e Nome */}
            <div className="flex items-center gap-4 border-l pl-4 ml-2 border-gray-300 dark:border-gray-600">
                <span className="font-bold text-gray-900 dark:text-white hidden sm:block">
                    {user.nome.split(' ')[0]}
                </span>
                <button onClick={logout} className="text-red-500 hover:text-red-700 transition-colors" title="Sair">
                    <LogOut className="h-6 w-6" />
                </button>
            </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;