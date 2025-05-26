import { useState, useCallback, useEffect } from 'react';
import { MedicalEntity, EntityCategory, MedicalEntityFormData } from '../types';
// INITIAL_MEDICAL_ENTITIES is removed as data source, but PREDEFINED_SERVICES might still be useful for form options
import { PREDEFINED_SERVICES } from '../constants'; 
import { supabase, uploadSupabaseImage, deleteSupabaseImage } from '../utils/supabaseClient';

export interface MedicalDataHook {
  entities: MedicalEntity[];
  loading: boolean;
  error: string | null;
  addEntity: (entity: MedicalEntityFormData) => Promise<void>;
  updateEntity: (id: string, updatedEntity: MedicalEntityFormData) => Promise<void>;
  deleteEntity: (id: string) => Promise<void>;
  getServicesForCategory: (category?: EntityCategory) => string[];
}

const useMedicalData = (): MedicalDataHook => {
  const [entities, setEntities] = useState<MedicalEntity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEntities = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from('medical_entities')
        .select('*')
        .order('name', { ascending: true });

      if (fetchError) throw fetchError;
      setEntities(data || []);
    } catch (e: any) {
      console.error('Error fetching entities:', e);
      setError(e.message || 'Failed to fetch data.');
      setEntities([]); // Clear entities on error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEntities();
  }, [fetchEntities]);

  const addEntity = useCallback(async (entityData: MedicalEntityFormData) => {
    setLoading(true);
    setError(null);
    try {
      let finalImageUrl = entityData.imageUrl;
      if (entityData.imageUrl && entityData.imageUrl.startsWith('data:image')) {
        finalImageUrl = await uploadSupabaseImage(entityData.imageUrl, entityData.name);
      }

      const payload = {
        ...entityData,
        rating: parseFloat(entityData.rating) || 0,
        imageUrl: finalImageUrl,
      };
      // Supabase generates ID, so we don't include it
      // const { id, ...insertPayload } = payload; 

      const { data, error: insertError } = await supabase
        .from('medical_entities')
        .insert([payload])
        .select();

      if (insertError) throw insertError;
      if (data) {
        setEntities(prevEntities => [...prevEntities, ...data]);
      }
      // await fetchEntities(); // Re-fetch to ensure consistency or update state directly
    } catch (e: any) {
      console.error('Error adding entity:', e);
      setError(e.message || 'Failed to add entity.');
      // Optionally re-throw or handle UI feedback
    } finally {
      setLoading(false);
    }
  }, [fetchEntities]);

  const updateEntity = useCallback(async (id: string, updatedEntityData: MedicalEntityFormData) => {
    setLoading(true);
    setError(null);
    try {
      const currentEntity = entities.find(e => e.id === id);
      let finalImageUrl = updatedEntityData.imageUrl;

      // Check if image needs to be uploaded (new base64 image)
      if (updatedEntityData.imageUrl && updatedEntityData.imageUrl.startsWith('data:image')) {
        // If there was an old image and it's a Supabase URL, delete it
        if (currentEntity?.imageUrl && currentEntity.imageUrl.includes(supabase.storage.url)) {
          await deleteSupabaseImage(currentEntity.imageUrl);
        }
        finalImageUrl = await uploadSupabaseImage(updatedEntityData.imageUrl, updatedEntityData.name);
      } 
      // Check if image is being removed (imageUrl is empty but was present)
      else if (!updatedEntityData.imageUrl && currentEntity?.imageUrl && currentEntity.imageUrl.includes(supabase.storage.url)) {
        await deleteSupabaseImage(currentEntity.imageUrl);
        finalImageUrl = undefined; // Set to undefined or null for DB
      }

      const payload = {
        ...updatedEntityData,
        rating: parseFloat(updatedEntityData.rating) || 0,
        imageUrl: finalImageUrl,
      };
      
      const { data, error: updateError } = await supabase
        .from('medical_entities')
        .update(payload)
        .eq('id', id)
        .select();

      if (updateError) throw updateError;
      if (data) {
         setEntities(prevEntities => prevEntities.map(e => e.id === id ? data[0] : e));
      }
      // await fetchEntities(); // Re-fetch to ensure consistency or update state directly
    } catch (e: any) {
      console.error('Error updating entity:', e);
      setError(e.message || 'Failed to update entity.');
    } finally {
      setLoading(false);
    }
  }, [entities, fetchEntities]);

  const deleteEntity = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const entityToDelete = entities.find(e => e.id === id);
      if (entityToDelete?.imageUrl && entityToDelete.imageUrl.includes(supabase.storage.url)) {
        await deleteSupabaseImage(entityToDelete.imageUrl);
      }

      const { error: deleteError } = await supabase
        .from('medical_entities')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;
      setEntities(prevEntities => prevEntities.filter(entity => entity.id !== id));
      // await fetchEntities(); // Re-fetch to ensure consistency or update state directly
    } catch (e: any) {
      console.error('Error deleting entity:', e);
      setError(e.message || 'Failed to delete entity.');
    } finally {
      setLoading(false);
    }
  }, [entities, fetchEntities]);

  const getServicesForCategory = useCallback((category?: EntityCategory): string[] => {
    // This logic can remain for now, or be adapted to fetch distinct services from Supabase if needed
    const allServices = new Set<string>();
    // entities.forEach(e => e.services.forEach(s => allServices.add(s))); // Use current entities
    PREDEFINED_SERVICES.forEach(s => allServices.add(s.name)); // Ensure predefined are available
    return Array.from(allServices).sort();
  }, []);


  return { entities, loading, error, addEntity, updateEntity, deleteEntity, getServicesForCategory };
};

export default useMedicalData;