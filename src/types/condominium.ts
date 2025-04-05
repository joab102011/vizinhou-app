export interface Condominium {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  totalUnits: number;
  createdAt: any; // Timestamp do Firestore
  updatedAt: any; // Timestamp do Firestore
} 