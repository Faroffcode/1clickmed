import React from 'react';
import { Specialty } from '../../types';

interface SpecialtyCardProps {
  specialty: Specialty;
  onClick: () => void;
}

const SpecialtyCard: React.FC<SpecialtyCardProps> = ({ specialty, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-slate-800 p-4 rounded-lg shadow-md text-center flex flex-col items-center justify-center aspect-square
                 transform hover:scale-105 hover:bg-slate-700/80 transition-all duration-300 ease-in-out focus:outline-none focus-ring-sky group"
      aria-label={`Browse ${specialty.name}`}
    >
      <div className="text-3xl mb-2 text-sky-400 group-hover:text-sky-300 transition-colors">{specialty.icon}</div>
      <h4 className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">{specialty.name}</h4>
      <p className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">{specialty.specialistCount} Specialists</p>
    </button>
  );
};

export default SpecialtyCard;