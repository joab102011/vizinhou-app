export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl?: string;
  category: string;
  condition: 'new' | 'like_new' | 'good' | 'fair' | 'poor';
  swap: boolean;
  userId: string;
  userName: string;
  userPhotoURL?: string;
  createdAt: Date;
  updatedAt: Date;
  location?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
} 