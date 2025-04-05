export type NotificationType = 
  | 'new_message' 
  | 'new_offer' 
  | 'offer_accepted' 
  | 'offer_rejected' 
  | 'product_sold' 
  | 'new_follower';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: {
    productId?: string;
    chatRoomId?: string;
    offerId?: string;
    senderId?: string;
  };
  read: boolean;
  createdAt: Date;
} 