import React from 'react';
import { MedicalEntity } from '../../types';
import { CATEGORY_ICONS } from '../../constants';

interface MedicalEntityCardProps {
  entity: MedicalEntity;
  isFeatured?: boolean; // For potentially different styling for featured cards
}

const RatingStars: React.FC<{ rating: number }> = ({ rating }) => {
  const totalStars = 5;
  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, index) => (
        <i
          key={index}
          className={`fa-star ${index < Math.round(rating) ? 'fas text-yellow-400' : 'far text-slate-500'}`}
        ></i>
      ))}
      <span className="ml-2 text-sm text-slate-400">({rating.toFixed(1)})</span>
    </div>
  );
};

const MedicalEntityCard: React.FC<MedicalEntityCardProps> = ({ entity, isFeatured = false }) => {
  const cardBg = isFeatured ? "bg-slate-800/70" : "bg-slate-800";
  return (
    <div className={`${cardBg} rounded-xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 ease-in-out group`}>
      {entity.imageUrl && (
        <div className="w-full h-48 overflow-hidden">
          <img src={entity.imageUrl} alt={entity.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"/>
        </div>
      )}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-semibold text-slate-100 group-hover:text-sky-400 transition-colors">{entity.name}</h3>
          <span className="text-2xl ml-2 opacity-80">{CATEGORY_ICONS[entity.category]}</span>
        </div>
        <p className="text-sm text-sky-400 font-medium mb-2">{entity.category}</p>
        
        {!isFeatured && <RatingStars rating={entity.rating} />}
        
        <p className="text-slate-400 mt-3 mb-1 text-sm">
          <i className="fas fa-map-marker-alt mr-2 text-slate-500"></i>
          {entity.address}, {entity.area}, {entity.city}
        </p>
        
        {!isFeatured && (
           <p className="text-slate-400 mb-1 text-sm"><i className="fas fa-phone mr-2 text-slate-500"></i>{entity.contact}</p>
        )}

        {isFeatured && (
            <div className="mt-3 flex items-center">
                 <RatingStars rating={entity.rating} />
            </div>
        )}

        {entity.services.length > 0 && !isFeatured && (
          <div className="mt-4">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Services:</h4>
            <div className="flex flex-wrap gap-2">
              {entity.services.slice(0, 3).map(service => (
                <span key={service} className="bg-slate-700 text-sky-300 px-2.5 py-1 text-xs rounded-full font-medium">
                  {service}
                </span>
              ))}
              {entity.services.length > 3 && (
                <span className="bg-slate-600 text-slate-300 px-2.5 py-1 text-xs rounded-full font-medium">
                  +{entity.services.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalEntityCard;