import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode; // For search icon in input
}

const Input: React.FC<InputProps> = ({ label, id, error, className, icon, ...props }) => {
  const hasIcon = !!icon;
  return (
    <div className="w-full">
      {label && <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-1">{label}</label>}
      <div className="relative">
        {hasIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={id}
          className={`block w-full ${hasIcon ? 'pl-10' : 'px-3'} py-2.5 bg-slate-700 border ${error ? 'border-red-500' : 'border-slate-600'} rounded-md shadow-sm placeholder-slate-400 
                     focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-slate-100 ${className || ''}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
};

export default Input;