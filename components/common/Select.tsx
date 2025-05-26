import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string; 
}

const Select: React.FC<SelectProps> = ({ label, id, error, options, className, ...props }) => {
  return (
    <div className="w-full">
      {label && <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-1">{label}</label>}
      <select
        id={id}
        className={`mt-1 block w-full pl-3 pr-10 py-2.5 text-base bg-slate-700 border ${error ? 'border-red-500' : 'border-slate-600'} 
                   focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-md text-slate-100 ${className || ''}`}
        {...props}
      >
        {props.placeholder && <option value="" className="text-slate-400">{props.placeholder}</option>}
        {options.map(option => (
          <option key={option.value} value={option.value} className="bg-slate-700 text-slate-100">{option.label}</option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default Select;