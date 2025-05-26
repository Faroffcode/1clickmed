export enum EntityCategory {
  Doctor = 'Doctor',
  Hospital = 'Hospital',
  Lab = 'Pathology Lab',
  MedicalShop = 'Medical Shop',
}

export interface Service {
  id: string;
  name: string;
}

export interface MedicalEntity {
  id: string;
  name: string;
  category: EntityCategory;
  address: string;
  city: string;
  area: string;
  contact: string;
  rating: number; // 1-5
  services: string[]; // Array of service names
  imageurl?: string; // Changed from imageUrl to imageurl
}

export type MedicalEntityFormData = Omit<MedicalEntity, 'id' | 'rating'> & { rating: string }; // Rating as string for form input

export interface Specialty {
  id: string;
  name: string;
  icon: React.ReactNode;
  specialistCount: number;
}

export type UserSubView = 'home' | 'login' | 'signup' | 'doctorsPage' | 'medicalShopsPage' | 'labsPage' | 'hospitalsPage';