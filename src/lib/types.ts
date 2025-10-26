export interface Template {
  id: string;
  name: string;
  description: string;
  category: 'wedding' | 'engagement' | 'birthday' | 'baby-shower' | 'anniversary' | 'corporate' | 'other';
  price: number;
  isPremium: boolean;
  thumbnail: string;
  previewImages: string[];
  videoPreview?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomizationData {
  templateId: string;
  eventName: string;
  hostName: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  address: string;
  rsvpLink?: string;
  message: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  backgroundImage?: string;
  customFields: Record<string, string>;
}

export interface CartItem {
  template: Template;
  customization: Partial<CustomizationData>;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentIntentId: string;
  createdAt: Date;
  hostedUrls: string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
  orders: Order[];
}

export interface InvitationPage {
  id: string;
  slug: string;
  template: Template;
  customization: CustomizationData;
  isActive: boolean;
  viewCount: number;
  createdAt: Date;
  expiresAt?: Date;
}
