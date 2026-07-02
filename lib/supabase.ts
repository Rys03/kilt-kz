import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Listing = {
  id: string;
  title: string;
  description: string;
  type: 'sale' | 'rent';
  status: 'active' | 'pending' | 'sold';
  price: number;
  city: string;
  address: string;
  rooms: number;
  area_sqm: number;
  floor: number | null;
  total_floors: number | null;
  year_built: number | null;
  has_parking: boolean;
  has_elevator: boolean;
  images: string[];
  model_3d_url: string | null;
  property_type: 'apartment' | 'house' | 'land' | 'commercial' | 'garage' | null;
  contact_name: string;
  contact_phone: string;
  created_at: string;
  updated_at: string;
};

export const CITIES = [
  'Almaty',
  'Astana',
  'Shymkent',
  'Aktobe',
  'Atyrau',
  'Aktau',
  'Pavlodar',
  'Taraz',
  'Kostanay',
  'Uralsk',
] as const;

export type CityType = typeof CITIES[number];

export const formatPrice = (price: number, type: 'sale' | 'rent'): string => {
  const formatter = new Intl.NumberFormat('ru-KZ');
  if (type === 'rent') {
    return `${formatter.format(price)} ₸/мес`;
  }
  return `${formatter.format(price)} ₸`;
};

export const getCityFromSlug = (slug: string): string => {
  const cityMap: Record<string, string> = {
    almaty: 'Almaty',
    astana: 'Astana',
    shymkent: 'Shymkent',
    aktobe: 'Aktobe',
    atyrau: 'Atyrau',
    aktau: 'Aktau',
    pavlodar: 'Pavlodar',
    taraz: 'Taraz',
    kostanay: 'Kostanay',
    uralsk: 'Uralsk',
  };
  return cityMap[slug] || slug;
};

export const CITY_SLUGS: Record<string, string> = {
  'Алматы': 'almaty',
  'Астана': 'astana',
  'Шымкент': 'shymkent',
  'Актобе': 'aktobe',
  'Атырау': 'atyrau',
  'Актау': 'aktau',
  'Павлодар': 'pavlodar',
  'Тараз': 'taraz',
  'Костанай': 'kostanay',
  'Уральск': 'uralsk',
};

export const PROPERTY_TYPES = [
  { value: 'apartment', label: 'Квартира' },
  { value: 'house', label: 'Дом / Дача' },
  { value: 'land', label: 'Участок' },
  { value: 'commercial', label: 'Коммерческая' },
  { value: 'garage', label: 'Гараж' },
] as const;
