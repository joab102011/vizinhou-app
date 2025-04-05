export interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  productId?: string;
  createdAt: Date;
  read: boolean;
}

export interface ChatRoom {
  id: string;
  participants: string[];
  lastMessage?: Message;
  updatedAt: Date;
  productId?: string;
}

export interface ChatUser {
  id: string;
  name: string;
  photoURL: string;
} 