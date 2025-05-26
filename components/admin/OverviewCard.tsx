import React from 'react';

interface OverviewCardProps {
  title: string;
  count: number;
  iconClass: string;
  color: 'blue' | 'green' | 'purple' | 'red';
  onViewDetails: () => void;
}

const OverviewCard: React.FC<OverviewCardProps> = ({ title, count, iconClass, color, onViewDetails }) => {
  const colorStyles = {
    blue: {
      bg: 'bg-gradient-to-br from-sky-600 to-sky-700',
      text: 'text-sky-100',
      iconBg: 'bg-sky-500/80',
    },
    green: {
      bg: 'bg-gradient-to-br from-green-600 to-green-700',
      text: 'text-green-100',
      iconBg: 'bg-green-500/80',
    },
    purple: {
      bg: 'bg-gradient-to-br from-purple-600 to-purple-700',
      text: 'text-purple-100',
      iconBg: 'bg-purple-500/80',
    },
    red: {
      bg: 'bg-gradient-to-br from-red-600 to-red-700',
      text: 'text-red-100',
      iconBg: 'bg-red-500/80',
    },
  };

  const styles = colorStyles[color];

  return (
    <div className={`${styles.bg} ${styles.text} p-6 rounded-xl shadow-xl flex items-center justify-between transform hover:scale-105 transition-transform duration-300`}>
      <div>
        <p className="text-sm font-medium opacity-80 uppercase tracking-wider">{title}</p>
        <p className="text-4xl font-bold mt-1">{count}</p>
        <button 
            onClick={onViewDetails} 
            className="mt-3 text-xs font-semibold opacity-90 hover:opacity-100 hover:underline transition-opacity"
        >
          View Details <i className="fas fa-arrow-right text-xs ml-1"></i>
        </button>
      </div>
      <div className={`p-4 rounded-full ${styles.iconBg}`}>
        <i className={`${iconClass} text-3xl text-white opacity-90`}></i>
      </div>
    </div>
  );
};

export default OverviewCard;