import React from 'react';
import { MedicalEntity, EntityCategory } from '../../types';
import EntityTable from '../medical_entity/EntityTable';
import Button from '../common/Button';

interface EntityManagementPageProps {
  title: string;
  category: EntityCategory;
  entities: MedicalEntity[];
  onAdd: () => void;
  onEdit: (entity: MedicalEntity) => void;
  onDelete: (id: string) => void;
}

const EntityManagementPage: React.FC<EntityManagementPageProps> = ({
  title,
  category,
  entities,
  onAdd,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-3xl font-bold text-slate-100 mb-4 sm:mb-0">{title}</h1>
        <Button onClick={onAdd} variant="primary" size="md">
          <i className="fas fa-plus mr-2"></i>Add New {category === EntityCategory.MedicalShop ? "Shop" : category.replace('Pathology ', '')}
        </Button>
      </div>
      <EntityTable entities={entities} onEdit={onEdit} onDelete={onDelete} />
       {entities.length === 0 && (
        <div className="text-center py-10 bg-slate-800 rounded-lg shadow-md">
          <i className={`fas ${category === EntityCategory.Doctor ? 'fa-user-doctor' : category === EntityCategory.Hospital ? 'fa-hospital' : category === EntityCategory.MedicalShop ? 'fa-store' : 'fa-flask-vial'} fa-3x text-slate-500 mb-4`}></i>
          <p className="text-xl text-slate-400">No {title.toLowerCase()} found.</p>
          <p className="text-sm text-slate-500 mt-1">Click the "Add New" button to get started.</p>
        </div>
      )}
    </div>
  );
};

export default EntityManagementPage;