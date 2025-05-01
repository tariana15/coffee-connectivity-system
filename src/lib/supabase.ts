import { createClient } from '@supabase/supabase-js';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_URL');
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Типы для таблиц
export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  ingredients: { name: string; amount: number; unit: string }[];
  created_at: string;
};

export type Recipe = {
  id: string;
  name: string;
  drink_type: string;
  ingredients: string;
  created_at: string;
};

export type Sale = {
  id: string;
  shift_id: string;
  items: {
    product_id: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  payment_method: string;
  status: string;
  bonus_applied?: number;
  customer_phone?: string;
  bonus_earned?: number;
  created_at: string;
};

export type Shift = {
  id: string;
  is_open: boolean;
  opened_at: string;
  closed_at?: string;
  total_sales: number;
  transactions: number;
  coffee_count: number;
  food_count: number;
  created_at: string;
}; 