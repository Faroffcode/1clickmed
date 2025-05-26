import React from 'react';
import Button from '../common/Button';

interface AdminHeaderProps {
  onToggleUserView: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onToggleUserView }) => {
  // Placeholder for theme toggle state
  const [isLightMode, setIsLightMode] = React.useState(false);

  return (
    <header className="bg-slate-800 shadow-md px-6 py-3 flex justify-end items-center border-b border-slate-700">
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsLightMode(!isLightMode)} 
          className="text-slate-300 hover:text-white"
          title={isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}
        >
          <i className={`fas ${isLightMode ? 'fa-moon' : 'fa-sun'} mr-2`}></i>
          {isLightMode ? 'Dark Mode' : 'Light Mode'}
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onToggleUserView}
          className="border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white"
        >
          <i className="fas fa-arrow-left mr-2"></i>
          Back to Site
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;