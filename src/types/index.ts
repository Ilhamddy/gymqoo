export type MemberStatus = 'ACTIVE' | 'EXPIRING_SOON' | 'EXPIRED';

export interface Member {
  id: string;
  member_code: string; // e.g. MBR-001 (Physical Card ID)
  full_name: string;
  phone_number: string;
  gender: 'L' | 'P';
  plan_name: string;
  start_date: string; // YYYY-MM-DD
  expiry_date: string; // YYYY-MM-DD
  status: MemberStatus;
  last_reminded_at?: string | null;
  photo_url?: string;
}

export interface Plan {
  id: string;
  name: string;
  duration_days: number;
  price: number;
  price_display?: string;
  is_coming_soon?: boolean;
  badge?: string;
  features: string[];
  popular?: boolean;
}

export interface CheckInLog {
  id: string;
  member_id: string;
  member_code: string;
  member_name: string;
  check_in_time: string;
  status_at_checkin: MemberStatus;
}

export interface LeadInquiry {
  id?: string;
  full_name: string;
  phone_number: string;
  plan_interest: string;
  notes?: string;
  created_at?: string;
}
