import { supabase, isSupabaseConfigured } from './supabase';
import { Member, CheckInLog, LeadInquiry } from '@/types';
import { initialMembers } from './mock-data';
import { deriveMemberStatus } from './utils';

const STORAGE_MEMBERS_KEY = 'gymqoo_members';
const STORAGE_CHECKINS_KEY = 'gymqoo_checkins';

/**
 * Mengambil daftar seluruh member.
 * Otomatis mengambil dari Supabase jika koneksi aktif,
 * atau fallback ke LocalStorage browser jika belum dihubungkan.
 */
export async function getMembers(): Promise<Member[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        const mapped: Member[] = data.map((item) => ({
          id: item.id,
          member_code: item.member_code,
          full_name: item.full_name,
          phone_number: item.phone_number,
          gender: item.gender as 'L' | 'P',
          plan_name: item.plan_name,
          start_date: item.start_date,
          expiry_date: item.expiry_date,
          status: deriveMemberStatus(item.expiry_date),
          last_reminded_at: item.last_reminded_at,
          photo_url: item.photo_url,
        }));
        // Simpan salinan offline di localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem(STORAGE_MEMBERS_KEY, JSON.stringify(mapped));
        }
        return mapped;
      }
    } catch (err) {
      console.warn('[Supabase] Gagal mengambil data members, beralih ke cache lokal:', err);
    }
  }

  // Fallback: LocalStorage / Data Awal
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_MEMBERS_KEY);
    if (saved) {
      try {
        const parsed: Member[] = JSON.parse(saved);
        return parsed.map((m) => ({
          ...m,
          status: deriveMemberStatus(m.expiry_date),
        }));
      } catch (e) {
        console.error('Failed to parse cached members', e);
      }
    }
  }

  return initialMembers.map((m) => ({
    ...m,
    status: deriveMemberStatus(m.expiry_date),
  }));
}

/**
 * Helper untuk memastikan UUID valid jika id bertipe string non-UUID
 */
function isValidUuid(id: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
}

/**
 * Menyimpan member baru ke Supabase & LocalStorage
 */
export async function createMember(newMember: Member): Promise<{ success: boolean; member: Member }> {
  let createdMember = { ...newMember };

  if (isSupabaseConfigured && supabase) {
    try {
      const payload: Record<string, any> = {
        member_code: newMember.member_code,
        full_name: newMember.full_name,
        phone_number: newMember.phone_number,
        gender: newMember.gender,
        plan_name: newMember.plan_name,
        start_date: newMember.start_date,
        expiry_date: newMember.expiry_date,
        status: newMember.status,
        last_reminded_at: newMember.last_reminded_at || null,
      };

      // Hanya kirim id jika valid UUID, jika tidak biarkan Supabase membuatkan UUID otomatis
      if (isValidUuid(newMember.id)) {
        payload.id = newMember.id;
      }

      const { data, error } = await supabase
        .from('members')
        .insert([payload])
        .select()
        .single();

      if (error) {
        console.error('[Supabase] Gagal menyimpan member ke database cloud:', error);
      } else if (data) {
        createdMember = {
          ...createdMember,
          id: data.id,
        };
      }
    } catch (err) {
      console.error('[Supabase] Insert member exception:', err);
    }
  }

  // Selalu sinkronkan ke local storage
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_MEMBERS_KEY);
    const list: Member[] = saved ? JSON.parse(saved) : initialMembers;
    const updated = [createdMember, ...list.filter((m) => m.id !== newMember.id)];
    localStorage.setItem(STORAGE_MEMBERS_KEY, JSON.stringify(updated));
  }

  return { success: true, member: createdMember };
}

/**
 * Mengupdate data member (perpanjangan / edit tanggal kadaluarsa / update reminder)
 */
export async function updateMember(updatedMember: Member): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase
        .from('members')
        .update({
          member_code: updatedMember.member_code,
          full_name: updatedMember.full_name,
          phone_number: updatedMember.phone_number,
          gender: updatedMember.gender,
          plan_name: updatedMember.plan_name,
          start_date: updatedMember.start_date,
          expiry_date: updatedMember.expiry_date,
          status: deriveMemberStatus(updatedMember.expiry_date),
          last_reminded_at: updatedMember.last_reminded_at,
          updated_at: new Date().toISOString(),
        })
        .eq('id', updatedMember.id);
    } catch (err) {
      console.warn('[Supabase] Update member failed:', err);
    }
  }

  // Sync LocalStorage
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_MEMBERS_KEY);
    if (saved) {
      const list: Member[] = JSON.parse(saved);
      const updatedList = list.map((m) =>
        m.id === updatedMember.id ? { ...updatedMember, status: deriveMemberStatus(updatedMember.expiry_date) } : m
      );
      localStorage.setItem(STORAGE_MEMBERS_KEY, JSON.stringify(updatedList));
    }
  }

  return true;
}

/**
 * Menghapus member
 */
export async function deleteMember(memberId: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('members').delete().eq('id', memberId);
    } catch (err) {
      console.warn('[Supabase] Delete member failed:', err);
    }
  }

  // Sync LocalStorage
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_MEMBERS_KEY);
    if (saved) {
      const list: Member[] = JSON.parse(saved);
      const updatedList = list.filter((m) => m.id !== memberId);
      localStorage.setItem(STORAGE_MEMBERS_KEY, JSON.stringify(updatedList));
    }
  }

  return true;
}

/**
 * Mengambil log kedatangan (check-ins)
 */
export async function getCheckIns(): Promise<CheckInLog[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('check_ins')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (!error && data) {
        return data as CheckInLog[];
      }
    } catch (err) {
      console.warn('[Supabase] Gagal mengambil check-ins:', err);
    }
  }

  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_CHECKINS_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse checkins', e);
      }
    }
  }

  return [];
}

/**
 * Mencatat kedatangan baru (check-in)
 */
export async function createCheckIn(log: CheckInLog): Promise<boolean> {
  let createdLog = { ...log };

  if (isSupabaseConfigured && supabase) {
    try {
      const payload: Record<string, any> = {
        member_code: log.member_code,
        member_name: log.member_name,
        check_in_time: (log.check_in_time || '').substring(0, 20),
        status_at_checkin: log.status_at_checkin,
      };

      if (isValidUuid(log.id)) {
        payload.id = log.id;
      }
      if (isValidUuid(log.member_id)) {
        payload.member_id = log.member_id;
      }

      const { data, error } = await supabase.from('check_ins').insert([payload]).select().single();
      if (error) {
        console.error('[Supabase] Insert check-in failed:', error);
      } else if (data) {
        createdLog = { ...createdLog, id: data.id };
      }
    } catch (err) {
      console.warn('[Supabase] Insert check-in failed:', err);
    }
  }

  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_CHECKINS_KEY);
    const list: CheckInLog[] = saved ? JSON.parse(saved) : [];
    const updated = [createdLog, ...list].slice(0, 100);
    localStorage.setItem(STORAGE_CHECKINS_KEY, JSON.stringify(updated));
  }

  return true;
}

/**
 * Menyimpan pendaftaran form minat dari pengunjung landing page
 */
export async function saveLeadInquiry(lead: LeadInquiry): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('lead_inquiries').insert([
        {
          full_name: lead.full_name,
          phone_number: lead.phone_number,
          plan_interest: lead.plan_interest,
          notes: lead.notes || null,
        },
      ]);
      return !error;
    } catch (err) {
      console.warn('[Supabase] Insert lead inquiry failed:', err);
    }
  }
  return true;
}

/**
 * Mengambil daftar calon member baru yang mendaftar dari website (Leads)
 */
export async function getLeadInquiries(): Promise<LeadInquiry[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('lead_inquiries')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (!error && data) {
        return data as LeadInquiry[];
      }
    } catch (err) {
      console.warn('[Supabase] Gagal mengambil leads:', err);
    }
  }

  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('gym_leads');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse leads', e);
      }
    }
  }

  return [];
}

