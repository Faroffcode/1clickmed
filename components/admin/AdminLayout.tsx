import React from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

type AdminPage = 'dashboard' | 'doctors' | 'hospitals' | 'medical-shops' | 'labs' | 'messages' | 'settings';

interface AdminLayoutProps {
  children: React.ReactNode;
  activePage: AdminPage;
  setActivePage: (page: AdminPage) => void;
  onToggleUserView: () => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, activePage, setActivePage, onToggleUserView }) => {
  return (
    <div className="flex h-screen bg-slate-900 text-slate-200">
      <AdminSidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader onToggleUserView={onToggleUserView} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-800/50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;