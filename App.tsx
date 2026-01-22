import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StoreProvider, useStore } from './context/StoreContext.tsx';
import { AdminDashboard, UnassignedList } from './pages/AdminDashboard';
import { MasterManagement } from './pages/MasterManagement';
import { DriverPortal } from './pages/DriverPortal';
import { LoginPage } from './pages/LoginPage';
import { Loader2 } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentUser, isLoading } = useStore();

  // Show loading spinner during initial Supabase fetch
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 flex-col gap-4">
        <Loader2 className="animate-spin text-blue-600" size={48} />
        <p className="text-gray-500 font-bold">システムに接続中...</p>
      </div>
    );
  }

  if (!currentUser) {
    return <LoginPage />;
  }

  // If ID matches a driver, show Driver Portal
  if (currentUser !== 'ADMIN') {
    return <DriverPortal />;
  }

  return (
    <Routes>
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/unassigned" element={<UnassignedList />} />
      <Route path="/admin/masters" element={<MasterManagement />} />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <StoreProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </StoreProvider>
  );
};

export default App;
