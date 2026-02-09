
import { Branch, Category, Product } from './types';

export const BRANCHES: Branch[] = [
  { id: 1, name: 'فرع أبها المنسك', location: 'أبها - المنسك', phone: '966559360060' },
  { id: 2, name: 'فرع أحد رفيدة', location: 'أحد رفيدة', phone: '966533292266' },
  { id: 3, name: 'فرع خميس مشيط النخيل', location: 'خميس مشيط - النخيل', phone: '966559260060' },
  { id: 4, name: 'فرع خميس مشيط طريق الرياض', location: 'خميس مشيط - طريق الرياض', phone: '966559260060' },
];

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'new', name: 'جديدنا' },
  { id: 'classic', name: 'الكنافة الكلاسيكية' },
  { id: 'boxes', name: 'بوكسات فرن الكنافة' },
  { id: 'drinks', name: 'المشروبات والقهوة' },
  { id: 'sauces', name: 'إضافة صوصات' },
];

export const INITIAL_PRODUCTS: Product[] = [
  // جديدنا
  { id: 'p1', name: 'بسبوسة الكنافة', category: 'new', price: 27, isNew: true, image: 'https://images.unsplash.com/photo-1571506191039-299b8069502b?auto=format&fit=crop&q=80&w=400' },
  
  // الكنافة الكلاسيكية
  { 
    id: 'p2', name: 'قشطة', category: 'classic', 
    price: [
      { size: 'صغير', price: 20 },
      { size: 'وسط', price: 25 },
      { size: 'كبير', price: 35 },
      { size: 'عائلي', price: 50 },
    ],
    image: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    id: 'p3', name: 'جبنة', category: 'classic', 
    price: [
      { size: 'صغير', price: 25 },
      { size: 'وسط', price: 30 },
      { size: 'كبير', price: 45 },
      { size: 'عائلي', price: 65 },
    ],
    image: 'https://images.unsplash.com/photo-1571506191039-299b8069502b?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    id: 'p4', name: 'مكس (قشطة جبن)', category: 'classic', 
    price: [
      { size: 'صغير', price: 25 },
      { size: 'وسط', price: 30 },
      { size: 'كبير', price: 45 },
      { size: 'عائلي', price: 65 },
    ],
    image: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    id: 'p5', name: 'بستاشيو', category: 'classic', 
    price: [
      { size: 'صغير', price: 25 },
      { size: 'وسط', price: 30 },
      { size: 'كبير', price: 45 },
      { size: 'عائلي', price: 65 },
    ],
    image: 'https://images.unsplash.com/photo-1571506191039-299b8069502b?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    id: 'p6', name: 'كيندر', category: 'classic', 
    price: [
      { size: 'صغير', price: 25 },
      { size: 'وسط', price: 30 },
      { size: 'كبير', price: 45 },
      { size: 'عائلي', price: 65 },
    ],
    image: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    id: 'p7', name: 'نوتيلا', category: 'classic', 
    price: [
      { size: 'صغير', price: 25 },
      { size: 'وسط', price: 30 },
      { size: 'كبير', price: 45 },
      { size: 'عائلي', price: 65 },
    ],
    image: 'https://images.unsplash.com/photo-1571506191039-299b8069502b?auto=format&fit=crop&q=80&w=400' 
  },

  // بوكسات
  { id: 'b1', name: 'بقلاوة بيكانو', category: 'boxes', price: 39, image: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&q=80&w=400' },
  { id: 'b2', name: 'كنافة تشيز بايتس', category: 'boxes', 
    price: [
      { size: 'صغير', price: 32 },
      { size: 'كبير', price: 56 },
    ],
    image: 'https://images.unsplash.com/photo-1571506191039-299b8069502b?auto=format&fit=crop&q=80&w=400' 
  },
  { id: 'b3', name: 'حليب محموس', category: 'boxes', 
    price: [
      { size: 'صغير', price: 39 },
      { size: 'كبير', price: 69 },
    ],
    image: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&q=80&w=400' 
  },
  { id: 'b4', name: 'كب قشطة', category: 'boxes', price: 30, image: 'https://images.unsplash.com/photo-1571506191039-299b8069502b?auto=format&fit=crop&q=80&w=400' },
  { id: 'b5', name: 'كب جبنة', category: 'boxes', price: 35, image: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&q=80&w=400' },
  { id: 'b6', name: 'كب مكس', category: 'boxes', price: 35, image: 'https://images.unsplash.com/photo-1571506191039-299b8069502b?auto=format&fit=crop&q=80&w=400' },
  { id: 'b7', name: 'كب صوص', category: 'boxes', price: 35, image: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&q=80&w=400' },
  { id: 'b8', name: 'كنافة رول', category: 'boxes', 
    price: [
      { size: 'صغير', price: 35 },
      { size: 'كبير', price: 55 },
    ],
    image: 'https://images.unsplash.com/photo-1571506191039-299b8069502b?auto=format&fit=crop&q=80&w=400' 
  },

  // مشروبات
  { id: 'd1', name: 'قهوة عربي', category: 'drinks', price: 5, image: 'https://images.unsplash.com/photo-1544787218-294472f3f80d?auto=format&fit=crop&q=80&w=400' },

  // صوصات
  { id: 's1', name: 'صوص إضافي', category: 'sauces', 
    price: [
      { size: 'صغير', price: 3 },
      { size: 'وسط', price: 5 },
      { size: 'كبير', price: 7 },
      { size: 'عائلي', price: 9 },
    ],
    image: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&q=80&w=400' 
  },
];
