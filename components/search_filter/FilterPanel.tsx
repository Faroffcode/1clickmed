

import React from 'react';
import { EntityCategory } from '../../types';
import { PREDEFINED_SERVICES } from '../../constants';
import Select from '../common/Select';
import Checkbox from '../common/Checkbox';

interface FilterPanelProps {
  selectedCategory: EntityCategory | '';
  onCategoryChange: (category: EntityCategory | '') => void;
  selectedServices: string[];
  onServiceChange: (service: string, checked: boolean) => void;
  // Fix: Added optional hideCategoryFilter prop
  hideCategoryFilter?: boolean; 
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  selectedCategory,
  onCategoryChange,
  selectedServices,
  onServiceChange,
  hideCategoryFilter = false, // Default to false if not provided
}) => {
  const categoryOptions = [
    { value: '', label: 'All Categories' },
    ...Object.values(EntityCategory).map(cat => ({ value: cat, label: cat })),
  ];

  return (
    <div className="bg-slate-800 p-4 sm:p-6 rounded-lg shadow-xl mb-6">
      <h3 className="text-lg font-semibold mb-4 text-slate-100">Refine Your Search</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {!hideCategoryFilter && (
          <div>
            <Select
              label="Filter by Category"
              options={categoryOptions}
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value as EntityCategory | '')}
              placeholder="Select a category"
              className="bg-slate-700 border-slate-600 text-slate-100"
            />
          </div>
        )}
        <div className={hideCategoryFilter ? 'md:col-span-2' : ''}> {/* Adjust grid span if category filter is hidden */}
          <label className="block text-sm font-medium text-slate-300 mb-1">Filter by Services</label>
          <div className="max-h-48 overflow-y-auto space-y-2 border border-slate-700 bg-slate-700/30 p-3 rounded-md custom-scrollbar">
            {PREDEFINED_SERVICES.map(service => (
              <Checkbox
                key={service.id}
                id={`service-filter-${service.id}`}
                label={service.name}
                checked={selectedServices.includes(service.name)}
                onChange={(e) => onServiceChange(service.name, e.target.checked)}
                className="text-slate-200"
              />
            ))}
          </div>
        </div>
      </div>
      {/* Fix: Replaced <style jsx global> with standard <style> tag for custom scrollbar styles */}
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #334155; /* slate-700 */
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #64748B; /* slate-500 */
            border-radius: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #94A3B8; /* slate-400 */
          }
        `}
      </style>
    </div>
  );
};

export default FilterPanel;