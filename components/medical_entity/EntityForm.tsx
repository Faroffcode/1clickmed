import React, { useState, useEffect, ChangeEvent } from 'react';
import { MedicalEntity, EntityCategory, MedicalEntityFormData } from '../../types';
import { PREDEFINED_SERVICES } from '../../constants';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import Checkbox from '../common/Checkbox';

interface EntityFormProps {
  initialData?: MedicalEntity | null;
  onSubmit: (data: MedicalEntityFormData) => void;
  onCancel: () => void;
  targetCategory?: EntityCategory | null;
}

const EntityForm: React.FC<EntityFormProps> = ({ initialData, onSubmit, onCancel, targetCategory }) => {
  const emptyFormData: MedicalEntityFormData = {
    name: '',
    category: targetCategory || EntityCategory.Doctor,
    address: '',
    city: '',
    area: '',
    contact: '',
    rating: '3',
    services: [],
    imageurl: '',
  };

  const [formData, setFormData] = useState<MedicalEntityFormData>(emptyFormData);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        rating: String(initialData.rating),
        category: targetCategory && !initialData.id ? targetCategory : initialData.category,
      });
      if (initialData.imageurl) {
        setImagePreviewUrl(initialData.imageurl);
      } else {
        setImagePreviewUrl(null);
      }
    } else {
      setFormData(prev => ({ ...emptyFormData, category: targetCategory || prev.category }));
      setImagePreviewUrl(null);
    }
  }, [initialData, targetCategory]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (serviceName: string, checked: boolean) => {
    setFormData(prev => {
      const currentServices = prev.services || [];
      if (checked) {
        return { ...prev, services: [...currentServices, serviceName] };
      } else {
        return { ...prev, services: currentServices.filter(s => s !== serviceName) };
      }
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setFormData(prev => ({ ...prev, imageurl: result }));
        setImagePreviewUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, imageurl: '' }));
    setImagePreviewUrl(null);
    const fileInput = document.getElementById('imageUpload') as HTMLInputElement;
    if (fileInput) {
        fileInput.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const categoryOptions = Object.values(EntityCategory).map(cat => ({ value: cat, label: cat }));

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input name="name" label="Name" value={formData.name} onChange={handleChange} required
             className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400" />
      <Select
        name="category"
        label="Category"
        options={categoryOptions}
        value={formData.category}
        onChange={handleChange}
        required
        className="bg-slate-700 border-slate-600 text-slate-100"
        disabled={!!targetCategory && !initialData}
      />
      <Input name="address" label="Address" value={formData.address} onChange={handleChange} required
             className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input name="city" label="City" value={formData.city} onChange={handleChange} required
               className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400" />
        <Input name="area" label="Area" value={formData.area} onChange={handleChange} required
               className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400" />
      </div>
      <Input name="contact" label="Contact (Phone/Email)" value={formData.contact} onChange={handleChange} required
             className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400" />
      <Input name="rating" label="Rating (1-5)" type="number" min="0" max="5" step="0.1" value={formData.rating} onChange={handleChange} required
             className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400" />
      
      <div>
        <label htmlFor="imageUpload" className="block text-sm font-medium text-slate-300 mb-1">
          Image
        </label>
        <div className="mt-1 flex flex-col items-start">
          <div className="flex items-center space-x-3">
            <label
              htmlFor="imageUpload"
              className="cursor-pointer bg-slate-600 hover:bg-slate-500 text-slate-100 font-medium py-2 px-4 rounded-md transition-colors"
            >
              {imagePreviewUrl ? 'Change Image' : 'Upload Image'}
            </label>
            <input
              id="imageUpload"
              name="imageUpload"
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleImageChange}
            />
            {imagePreviewUrl && (
              <Button type="button\" variant="ghost\" size="sm\" onClick={removeImage} className="text-red-400 hover:text-red-300">
                Remove Image
              </Button>
            )}
          </div>
          {imagePreviewUrl && (
            <div className="mt-4 p-2 border border-slate-600 rounded-md bg-slate-700/50">
              <img src={imagePreviewUrl} alt="Preview" className="h-32 w-auto rounded" />
            </div>
          )}
          {!imagePreviewUrl && !initialData?.imageurl && (
             <p className="mt-2 text-xs text-slate-400">No image selected. JPG, PNG, GIF, WebP accepted.</p>
          )}
        </div>
      </div>
      {initialData?.imageurl && !initialData.imageurl.startsWith('data:image') && (
          <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Current Image URL (Web Link)</label>
              <Input 
                name="imageurl" 
                value={formData.imageurl || ''} 
                onChange={handleChange} 
                placeholder="https://example.com/image.jpg"
                className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400"
                disabled
              />
               <p className="mt-1 text-xs text-slate-400">This is an external image URL. To change it, upload a new image above or manually edit the URL (if not a local upload).</p>
          </div>
      )}
       {!imagePreviewUrl && (!initialData?.imageurl || !initialData.imageurl.startsWith('data:image')) && (
        <Input 
            name="imageurl" 
            label="Or Enter Image URL (Optional)" 
            value={formData.imageurl || ''} 
            onChange={handleChange} 
            placeholder="https://example.com/image.jpg"
            className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400" 
        />
      )}

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Services</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto border border-slate-700 bg-slate-700/50 p-3 rounded-md custom-scrollbar">
          {PREDEFINED_SERVICES.map(service => (
            <Checkbox
              key={service.id}
              id={`form-service-${service.id}`}
              label={service.name}
              checked={(formData.services || []).includes(service.name)}
              onChange={(e) => handleServiceChange(service.name, e.target.checked)}
              className="text-slate-200"
            />
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="primary">{initialData ? 'Update' : 'Add'} Entity</Button>
      </div>
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #334155;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #64748B;
            border-radius: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #94A3B8;
          }
        `}
      </style>
    </form>
  );
};

export default EntityForm;