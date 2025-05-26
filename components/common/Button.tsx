import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  ...props
}) => {
  const baseStyles = 'font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 transition-colors duration-150 flex items-center justify-center';
  
  const variantStyles = {
    primary: 'bg-sky-500 hover:bg-sky-600 text-white focus:ring-sky-400',
    secondary: 'bg-slate-700 hover:bg-slate-600 text-slate-100 focus:ring-slate-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    ghost: 'bg-transparent hover:bg-slate-700 text-slate-300 hover:text-white focus:ring-sky-500',
    outline: 'bg-transparent border border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white focus:ring-sky-400',
    link: 'bg-transparent text-sky-400 hover:text-sky-300 hover:underline focus:ring-sky-500 p-0',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base', // Increased padding slightly for better feel
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;