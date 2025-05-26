import React from 'react';
import Button from '../common/Button';
import { UserSubView } from '../../types';
import { APP_NAME } from '../../constants'; // Import APP_NAME

interface HeaderProps {
  setActiveUserSubView: (view: UserSubView) => void;
}

const Header: React.FC<HeaderProps> = ({ setActiveUserSubView }) => {
  const AppLogo = () => (
    <div 
      className="flex items-center cursor-pointer"
      onClick={() => setActiveUserSubView('home')}
      role="button"
      tabIndex={0}
      aria-label="Go to homepage"
      onKeyDown={(e) => e.key === 'Enter' && setActiveUserSubView('home')}
    >
      <span className="text-3xl font-bold text-sky-400">1click</span>
      <span className="text-3xl font-bold text-white">Med</span>
    </div>
  );

  const navLinks = ["Home", "Doctors", "Medical Shops", "Labs", "Hospitals"];

  return (
    <header className="bg-slate-900/80 backdrop-blur-md shadow-lg py-4 px-6 sticky top-0 z-40">
      <div className="container mx-auto flex justify-between items-center">
        <AppLogo />
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map(link => (
            <a 
              key={link} 
              href="#" 
              onClick={(e) => { 
                e.preventDefault(); 
                // Determine appropriate subview based on link text or a more robust mapping
                if (link === "Home") setActiveUserSubView('home');
                else if (link === "Doctors") setActiveUserSubView('doctorsPage');
                else if (link === "Medical Shops") setActiveUserSubView('medicalShopsPage');
                else if (link === "Labs") setActiveUserSubView('labsPage');
                else if (link === "Hospitals") setActiveUserSubView('hospitalsPage');
                else setActiveUserSubView('home');
              }}
              className="text-slate-300 hover:text-sky-400 transition-colors font-medium"
            >
              {link}
            </a>
          ))}
        </nav>
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="md" 
            className="hidden sm:flex"
            onClick={() => setActiveUserSubView('login')}
          >
            <i className="fas fa-user mr-2"></i>Login
          </Button>
          <Button 
            variant="primary" 
            size="md"
            onClick={() => setActiveUserSubView('signup')}
          >
            Sign Up
          </Button>
          <button 
            className="md:hidden text-slate-300 hover:text-sky-400 focus:outline-none"
            aria-label="Open mobile menu"
            onClick={() => { /* Placeholder for mobile menu toggle, could show auth links */}}
          >
            <i className="fas fa-bars fa-lg"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;