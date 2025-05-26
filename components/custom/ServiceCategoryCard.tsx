import React from 'react';
import Button from '../common/Button';

interface ServiceCategoryCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onBrowse: () => void;
}

const ServiceCategoryCard: React.FC<ServiceCategoryCardProps> = ({ icon, title, description, onBrowse }) => {
  return (
    <div className="bg-slate-800 p-6 rounded-xl shadow-lg text-center flex flex-col items-center transform hover:bg-slate-700/70 transition-all duration-300 ease-in-out hover:-translate-y-1">
      <div className="text-4xl mb-4 text-sky-400">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-slate-400 text-sm mb-5 flex-grow">{description}</p>
      <Button onClick={onBrowse} variant="link" className="text-sky-400 hover:text-sky-300 font-medium group">
        Browse {title} <i className="fas fa-arrow-right ml-2 transform group-hover:translate-x-1 transition-transform"></i>
      </Button>
    </div>
  );
};

export default ServiceCategoryCard;