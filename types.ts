
export type PriceOption = {
  size: 'صغير' | 'وسط' | 'كبير' | 'عائلي';
  price: number;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number | PriceOption[];
  image?: string;
  isNew?: boolean;
};

export type Category = {
  id: string;
  name: string;
};

export type Branch = {
  id: number;
  name: string;
  location: string;
  phone: string;
};

export type OrderItem = {
  product: Product;
  selectedSize?: string;
  quantity: number;
  price: number;
};

export type Order = {
  id: string;
  branchId: number;
  items: OrderItem[];
  total: number;
  type: 'delivery' | 'pickup';
  paymentMethod: 'apple_pay' | 'cash';
  customerLocation?: string;
  timestamp: number;
};

export type PaymentConfig = {
  applePayEnabled: boolean;
  cashOnDeliveryEnabled: boolean;
  accountDetails?: string;
};

export type AdminConfig = {
  username: string;
  passwordHash: string;
  bannerTitle?: string;
  bannerSubtitle?: string;
};
