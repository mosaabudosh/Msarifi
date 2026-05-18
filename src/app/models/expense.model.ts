export interface Category {
  id: string;
  name: string;
  icon: string;
  color: CategoryColor;
}

export type CategoryColor = 'blue' | 'green' | 'red' | 'orange' | 'purple' | 'teal';

export interface Expense {
  id: string;
  amount: number;
  date: string;
  catId: string;
  note?: string;
  month: string;
  createdAt: number;
}

export interface MonthGroup {
  monthKey: string;
  monthLabel: string;
  expenses: Expense[];
  total: number;
}

export interface AppData {
  password: string;
  categories: Category[];
  expenses: Expense[];
  currency: string;
}

export const COLOR_STYLES: Record<string, { bg: string; text: string }> = {
  blue:   { bg: '#EFF6FF', text: '#1D4ED8' },
  green:  { bg: '#F0FDF4', text: '#15803D' },
  red:    { bg: '#FEF2F2', text: '#B91C1C' },
  orange: { bg: '#FFF7ED', text: '#C2410C' },
  purple: { bg: '#F5F3FF', text: '#6D28D9' },
  teal:   { bg: '#F0FDFA', text: '#0F766E' },
};

export const CATEGORY_ICONS: { value: string; label: string }[] = [
  { value: 'restaurant-outline',      label: '🍽️ طعام ومشروبات' },
  { value: 'cart-outline',            label: '🛒 تسوق'          },
  { value: 'car-outline',             label: '🚗 مواصلات'       },
  { value: 'home-outline',            label: '🏠 سكن'           },
  { value: 'heart-outline',           label: '❤️ صحة'           },
  { value: 'book-outline',            label: '📚 تعليم'         },
  { value: 'phone-portrait-outline',  label: '📱 تقنية'         },
  { value: 'shirt-outline',           label: '👕 ملابس'         },
  { value: 'game-controller-outline', label: '🎮 ترفيه'         },
  { value: 'cash-outline',            label: '💰 متنوعة'        },
  { value: 'airplane-outline',        label: '✈️ سفر'           },
  { value: 'fitness-outline',         label: '💪 رياضة'         },
];

export const DEFAULT_DATA: AppData = {
  password: '1234',
  currency: 'JD',
  categories: [
    { id: 'c1', name: 'طعام ومشروبات', icon: 'restaurant-outline', color: 'orange' },
    { id: 'c2', name: 'مواصلات',       icon: 'car-outline',         color: 'blue'   },
    { id: 'c3', name: 'فواتير',        icon: 'cash-outline',        color: 'red'    },
    { id: 'c4', name: 'تسوق',          icon: 'cart-outline',        color: 'purple' },
    { id: 'c5', name: 'صحة',           icon: 'heart-outline',       color: 'green'  },
  ],
  expenses: [],
};
