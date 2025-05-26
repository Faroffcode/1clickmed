import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, id, className, ...props }) => {
  return (
    <div className={`flex items-center ${className || ''}`}>
      <input
        id={id}
        type="checkbox"
        className="h-4 w-4 text-sky-500 border-slate-600 rounded focus:ring-sky-500 bg-slate-700 focus:ring-offset-slate-800"
        {...props}
      />
      <label htmlFor={id} className="ml-2 block text-sm text-slate-300">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;