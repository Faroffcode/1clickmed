
import React, { useState } from 'react';
import Header from './components/layout/Header';
import PageContainer from './components/layout/PageContainer';
import UserView from './views/UserView';
import AdminView from './views/AdminView';
import LoginPage from './views/auth/LoginPage';
import SignUpPage from './views/auth/SignUpPage';
import useMedicalData from './hooks/useMedicalData';
import { APP_NAME } from './constants';
import { UserSubView } from './types';


const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'user' | 'admin'>('user');
  const [activeUserSubView, setActiveUserSubView] = useState<UserSubView>('home');
  
  // useMedicalData hook is now primarily used within AdminView or specific pages
  // UserView will manage its own instance or receive a shared one if needed for deeper integration.
  // For now, AdminView needs it directly.
  const medicalDataHookForAdmin = useMedicalData();

  const toggleView = () => {
    setCurrentView(prev => (prev === 'user' ? 'admin' : 'user'));
    setActiveUserSubView('home'); // Reset to home when toggling main views
  };

  const renderUserContent = () => {
    switch (activeUserSubView) {
      case 'login':
        return <LoginPage onNavigate={setActiveUserSubView} />;
      case 'signup':
        return <SignUpPage onNavigate={setActiveUserSubView} />;
      case 'home':
      case 'doctorsPage':
      case 'medicalShopsPage':
      case 'labsPage':
      case 'hospitalsPage':
      default:
        // UserView now fetches its own data using useMedicalData internally
        return <UserView onToggleAdminView={toggleView} setActiveUserSubView={setActiveUserSubView} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {currentView === 'user' && <Header setActiveUserSubView={setActiveUserSubView} />} 
      
      {currentView === 'user' ? (
        <PageContainer>
          {renderUserContent()}
        </PageContainer>
      ) : (
        // AdminView needs the dataHook to manage entities
        <AdminView dataHook={medicalDataHookForAdmin} onToggleUserView={toggleView} />
      )}

      {currentView === 'user' && activeUserSubView === 'home' && (
         <footer className="bg-slate-950 text-slate-400 text-center p-6 mt-auto border-t border-slate-800">
            <p>&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
            <p className="text-sm mt-1">Designed to connect you with healthcare.</p>
        </footer>
      )}
    </div>
  );
};

export default App;