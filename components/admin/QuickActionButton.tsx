import React from 'react';
import Button from '../common/Button';

interface QuickActionButtonProps {
  label: string;
  iconClass: string;
  color: 'blue' | 'green' | 'purple' | 'red';
  onClick: () => void;
}

const QuickActionButton: React.FC<QuickActionButtonProps> = ({ label, iconClass, color, onClick }) => {
  const colorStyles = {
    blue: 'bg-sky-600 hover:bg-sky-700 focus:ring-sky-500',
    green: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
    purple: 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500',
    red: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
  };

  return (
    <Button
      onClick={onClick}
      className={`w-full text-white py-4 px-3 ${colorStyles[color]} flex items-center justify-start text-left rounded-lg shadow-md hover:shadow-lg transition-all duration-150`}
      variant="secondary" // Base variant, specific colors override background
      size="lg" // Use a larger size for these prominent buttons
    >
      <i className={`${iconClass} text-2xl mr-4 w-8 text-center opacity-90`}></i>
      <span className="font-medium text-base">{label}</span>
    </Button>
  );
};

export default QuickActionButton;