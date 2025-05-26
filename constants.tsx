
import React from 'react';
import { EntityCategory, Service, MedicalEntity, Specialty } from './types';

export const APP_NAME = "1clickMed"; // Using this as the core app name

// Consistent icons inspired by the design
export const CATEGORY_ICONS: Record<EntityCategory, React.ReactNode> = {
  [EntityCategory.Doctor]: <i className="fas fa-user-doctor text-sky-400"></i>, // More specific than stethoscope
  [EntityCategory.Hospital]: <i className="fas fa-hospital text-red-400"></i>,
  [EntityCategory.Lab]: <i className="fas fa-flask-vial text-green-400"></i>, // flask-vial for labs
  [EntityCategory.MedicalShop]: <i className="fas fa-prescription-bottle-medical text-amber-400"></i>, // More specific for shops
};

// Icons for the "Our Healthcare Services" section cards (from image)
export const SERVICE_SECTION_ICONS: Record<EntityCategory, React.ReactNode> = {
  [EntityCategory.Doctor]: <i className="fas fa-stethoscope fa-2x text-sky-500"></i>,
  [EntityCategory.MedicalShop]: <i className="fas fa-capsules fa-2x text-green-500"></i>, // Using capsules as per common medical shop icon
  [EntityCategory.Lab]: <i className="fas fa-microscope fa-2x text-purple-500"></i>,
  [EntityCategory.Hospital]: <i className="fas fa-clinic-medical fa-2x text-red-500"></i>, // Or fas fa-hospital
};

export const PREDEFINED_SERVICES: Service[] = [
  { id: 's1', name: '24/7 Emergency' },
  { id: 's2', name: 'Home Visit' },
  { id: 's3', name: 'Online Consultation' },
  { id: 's4', name: 'Ambulance Service' },
  { id: 's5', name: 'Pharmacy' },
  { id: 's6', name: 'Cardiology' },
  { id: 's7', name: 'Neurology' },
  { id: 's8', name: 'Pediatrics' },
  { id: 's9', name: 'X-Ray' },
  { id: 's10', name: 'Blood Test' },
  { id: 's11', name: 'Full Body Checkup'},
  { id: 's12', name: 'Dental Care'},
  { id: 's13', name: 'Orthopedics'},
  { id: 's14', name: 'General Medicine'},
  { id: 's15', name: 'Family Medicine'},
  { id: 's16', name: 'Ophthalmology'},
  { id: 's17', name: 'Dentistry'},
];


export const PREDEFINED_SPECIALTIES: Specialty[] = [
  { id: 'spec1', name: 'Cardiology', icon: <i className="fas fa-heart-pulse fa-2x text-sky-400"></i>, specialistCount: 128 },
  { id: 'spec2', name: 'Neurology', icon: <i className="fas fa-brain fa-2x text-sky-400"></i>, specialistCount: 87 },
  { id: 'spec3', name: 'Ophthalmology', icon: <i className="fas fa-eye fa-2x text-sky-400"></i>, specialistCount: 96 },
  { id: 'spec4', name: 'Dentistry', icon: <i className="fas fa-tooth fa-2x text-sky-400"></i>, specialistCount: 142 },
  { id: 'spec5', name: 'Orthopedics', icon: <i className="fas fa-bone fa-2x text-sky-400"></i>, specialistCount: 105 },
  { id: 'spec6', name: 'Pediatrics', icon: <i className="fas fa-baby fa-2x text-sky-400"></i>, specialistCount: 134 },
  { id: 'spec7', name: 'General Medicine', icon: <i className="fas fa-notes-medical fa-2x text-sky-400"></i>, specialistCount: 215 },
  { id: 'spec8', name: 'Family Medicine', icon: <i className="fas fa-users fa-2x text-sky-400"></i>, specialistCount: 178 },
];

// INITIAL_MEDICAL_ENTITIES removed as data will be fetched from Supabase
// export const INITIAL_MEDICAL_ENTITIES: MedicalEntity[] = [ ... ];
