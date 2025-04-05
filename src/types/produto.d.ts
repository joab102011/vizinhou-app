export interface Produto {
  id: string;
  title: string;
  description: string;
  price: number;
  swap: boolean;
  imageUrl: string;
  createdAt: Date;
  userId: string;
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
} 