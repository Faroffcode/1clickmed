import React, { useState, useCallback, useMemo } from 'react';
import { MedicalEntity, MedicalEntityFormData, EntityCategory } from '../types';
import useMedicalData, { MedicalDataHook } from '../hooks/useMedicalData'; // Import MedicalDataHook type
import EntityForm from '../components/medical_entity/EntityForm';
import Modal from '../components/common/Modal';
import AdminLayout from '../components/admin/AdminLayout';
import DashboardContent from '../components/admin/DashboardContent';
import EntityManagementPage from '../components/admin/EntityManagementPage';
import Button from '../components/common/Button'; // For error display

interface AdminViewProps {
  dataHook: MedicalDataHook; // Use the imported type
  onToggleUserView: () => void;
}

type AdminPage = 'dashboard' | 'doctors' | 'hospitals' | 'medical-shops' | 'labs' | 'messages' | 'settings';

const AdminView: React.FC<AdminViewProps> = ({ dataHook, onToggleUserView }) => {
  const { entities, addEntity, updateEntity, deleteEntity, loading, error, getServicesForCategory } = dataHook;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntity, setEditingEntity] = useState<MedicalEntity | null>(null);
  const [modalTargetCategory, setModalTargetCategory] = useState<EntityCategory | null>(null);
  const [activePage, setActivePage] = useState<AdminPage>('dashboard');

  const openModalForNew = (category?: EntityCategory) => {
    setEditingEntity(null);
    setModalTargetCategory(category || null); 
    setIsModalOpen(true);
  };

  const openModalForEdit = (entity: MedicalEntity) => {
    setEditingEntity(entity);
    setModalTargetCategory(entity.category); 
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setEditingEntity(null);
      setModalTargetCategory(null);
    }, 300); 
  };

  const handleFormSubmit = useCallback(async (formData: MedicalEntityFormData) => {
    // Rating is already string in MedicalEntityFormData, addEntity/updateEntity will parse it
    const entityPayload = {
      ...formData,
      // rating: parseFloat(formData.rating) || 0, // This parsing is now inside useMedicalData
      services: formData.services || [],
      category: modalTargetCategory || formData.category, 
    };

    if (editingEntity) {
      await updateEntity(editingEntity.id, entityPayload);
    } else {
      await addEntity(entityPayload);
    }
    // Check for errors from the hook before closing modal, or close optimistically
    // For simplicity, we close optimistically. Errors should be displayed by the hook's consumer.
    closeModal();
  }, [addEntity, updateEntity, editingEntity, modalTargetCategory, closeModal]); // Added closeModal to dependencies

  const handleDelete = useCallback(async (id: string) => {
    if (window.confirm('Are you sure you want to delete this entity? This action cannot be undone.')) {
      await deleteEntity(id);
    }
  }, [deleteEntity]);

  const counts = useMemo(() => {
    return entities.reduce((acc, entity) => {
      acc[entity.category] = (acc[entity.category] || 0) + 1;
      return acc;
    }, {} as Record<EntityCategory, number>);
  }, [entities]);

  const renderContent = () => {
    if (loading && activePage !== 'dashboard') { // Show loading spinner for entity pages
        return (
            <div className="flex justify-center items-center h-full">
                <i className="fas fa-spinner fa-spin fa-3x text-sky-400"></i>
            </div>
        );
    }
    if (error) { // Show error message
        return (
            <div className="text-center py-10 bg-red-900/30 text-red-300 p-6 rounded-lg">
                <i className="fas fa-exclamation-triangle fa-3x mb-4"></i>
                <p className="text-2xl mb-2">An Error Occurred</p>
                <p className="mb-4">{error}</p>
                <Button variant="primary" onClick={() => window.location.reload()} className="mt-4">
                   Try Reloading
                </Button>
            </div>
        );
    }

    switch (activePage) {
      case 'dashboard':
        return <DashboardContent counts={counts} onQuickAdd={openModalForNew} onViewDetails={(category) => {
          if(category === EntityCategory.Doctor) setActivePage('doctors');
          if(category === EntityCategory.Hospital) setActivePage('hospitals');
          if(category === EntityCategory.MedicalShop) setActivePage('medical-shops');
          if(category === EntityCategory.Lab) setActivePage('labs');
        }} />;
      case 'doctors':
        return <EntityManagementPage
                  title="Doctors"
                  category={EntityCategory.Doctor}
                  entities={entities.filter(e => e.category === EntityCategory.Doctor)}
                  onAdd={() => openModalForNew(EntityCategory.Doctor)}
                  onEdit={openModalForEdit}
                  onDelete={handleDelete}
                />;
      case 'hospitals':
        return <EntityManagementPage
                  title="Hospitals"
                  category={EntityCategory.Hospital}
                  entities={entities.filter(e => e.category === EntityCategory.Hospital)}
                  onAdd={() => openModalForNew(EntityCategory.Hospital)}
                  onEdit={openModalForEdit}
                  onDelete={handleDelete}
                />;
      case 'medical-shops':
        return <EntityManagementPage
                  title="Medical Shops"
                  category={EntityCategory.MedicalShop}
                  entities={entities.filter(e => e.category === EntityCategory.MedicalShop)}
                  onAdd={() => openModalForNew(EntityCategory.MedicalShop)}
                  onEdit={openModalForEdit}
                  onDelete={handleDelete}
                />;
      case 'labs':
        return <EntityManagementPage
                  title="Pathology Labs"
                  category={EntityCategory.Lab}
                  entities={entities.filter(e => e.category === EntityCategory.Lab)}
                  onAdd={() => openModalForNew(EntityCategory.Lab)}
                  onEdit={openModalForEdit}
                  onDelete={handleDelete}
                />;
      case 'messages':
        return <div className="text-slate-300 p-6 bg-slate-800 rounded-lg shadow-xl">Contact Messages (Coming Soon)</div>;
      case 'settings':
        return <div className="text-slate-300 p-6 bg-slate-800 rounded-lg shadow-xl">Settings (Coming Soon)</div>;
      default:
        return null;
    }
  };
  
  const formTitle = useMemo(() => {
    if (editingEntity) return `Edit ${editingEntity.category}`;
    if (modalTargetCategory) return `Add New ${modalTargetCategory}`;
    return 'Add New Entity';
  }, [editingEntity, modalTargetCategory]);


  return (
    <AdminLayout activePage={activePage} setActivePage={setActivePage} onToggleUserView={onToggleUserView}>
      {renderContent()}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={formTitle}
      >
        <EntityForm
          initialData={editingEntity}
          onSubmit={handleFormSubmit}
          onCancel={closeModal}
          targetCategory={modalTargetCategory}
        />
      </Modal>
    </AdminLayout>
  );
};

export default AdminView;