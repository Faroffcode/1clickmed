import React from 'react';
import { MedicalEntity } from '../../types';
import { CATEGORY_ICONS } from '../../constants';
import Button from '../common/Button';

interface EntityTableProps {
  entities: MedicalEntity[];
  onEdit: (entity: MedicalEntity) => void;
  onDelete: (id: string) => void;
}

const EntityTable: React.FC<EntityTableProps> = ({ entities, onEdit, onDelete }) => {
  return (
    <div className="bg-slate-800 shadow-xl rounded-lg overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-700">
        <thead className="bg-slate-700/50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Name</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Category</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Location</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Contact</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Rating</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-slate-800 divide-y divide-slate-700">
          {entities.map(entity => (
            <tr key={entity.id} className="hover:bg-slate-700/50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-slate-100">{entity.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <span className="text-lg mr-3 opacity-80">{CATEGORY_ICONS[entity.category]}</span>
                  <span className="text-sm text-slate-300">{entity.category}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">{entity.city}, {entity.area}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">{entity.contact}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-400">
                {'★'.repeat(Math.floor(entity.rating))}{'☆'.repeat(5 - Math.floor(entity.rating))} 
                <span className="text-slate-400 ml-1">({entity.rating.toFixed(1)})</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                <Button variant="ghost" size="sm" onClick={() => onEdit(entity)} className="text-sky-400 hover:text-sky-300">Edit</Button>
                <Button variant="danger" size="sm" onClick={() => onDelete(entity.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {entities.length === 0 && (
        <p className="text-center py-6 text-slate-500">No entities found. Add new ones to get started.</p>
      )}
    </div>
  );
};

export default EntityTable;