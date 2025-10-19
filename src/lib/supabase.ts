import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type WasteType = 'General' | 'Plastic' | 'Organic' | 'E-Waste' | 'Hazardous' | 'Mixed';
export type ReportStatus = 'Pending' | 'In Progress' | 'Resolved';
export type PickupStatus = 'Pending' | 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';

export interface BinReport {
  id: string;
  location: string;
  latitude?: number;
  longitude?: number;
  waste_type: WasteType;
  photo_url?: string;
  comments?: string;
  status: ReportStatus;
  reporter_email?: string;
  created_at: string;
  updated_at: string;
}

export interface ScheduledPickup {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  latitude?: number;
  longitude?: number;
  waste_type: WasteType;
  waste_volume: string;
  preferred_date: string;
  preferred_time: string;
  notes?: string;
  status: PickupStatus;
  reference_number: string;
  created_at: string;
  updated_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  role: string;
  created_at: string;
}
