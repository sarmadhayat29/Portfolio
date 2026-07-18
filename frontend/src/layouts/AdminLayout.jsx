import { useEffect, useState } from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase';

const AdminLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      if (!session) navigate('/admin/login');
    });

    return () => subscription?.unsubscribe();
  }, [navigate]);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-emerald-500 font-medium">
        Loading Secure Environment...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans">
      <nav className="bg-gray-900 border-b border-emerald-500/20 px-6 py-4 flex justify-between items-center sticky top-0 z-50 shadow-md">
        <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent cursor-pointer" onClick={() => navigate('/')}>
          Admin Portal
        </h1>
        <button
          onClick={() => supabase.auth.signOut()}
          className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
        >
          Logout
        </button>
      </nav>
      <main className="p-6 md:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
