import { Timestamp } from 'firebase/firestore';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  condition: 'new' | 'like_new' | 'good' | 'fair' | 'poor';
  userId: string;
  userName: string;
  userPhoto?: string;
  location: string;
  condominiumId: string;
  condominiumName: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  isSwappable: boolean;
  status: 'active' | 'sold' | 'reserved';
} 