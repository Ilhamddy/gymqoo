-- ==============================================================
-- GYMQOO FITNESS CENTER - SUPABASE DATABASE SCHEMA
-- Jalankan skrip SQL ini di menu "SQL Editor" pada dashboard Supabase Anda
-- (https://supabase.com/dashboard/project/_/sql)
-- ==============================================================

-- 1. Tabel Members (Data Member Gym)
CREATE TABLE IF NOT EXISTS public.members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_code VARCHAR(50) UNIQUE NOT NULL, -- Nomor pada kartu fisik (misal: MBR-00101)
    full_name VARCHAR(150) NOT NULL,
    phone_number VARCHAR(30) NOT NULL,
    gender VARCHAR(10) DEFAULT 'L' CHECK (gender IN ('L', 'P')),
    plan_name VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL DEFAULT CURRENT_DATE,
    expiry_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'EXPIRING_SOON', 'EXPIRED')),
    last_reminded_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pencarian cepat untuk nomor kartu, nomor HP, dan tanggal kadaluarsa
CREATE INDEX IF NOT EXISTS idx_members_code ON public.members (member_code);
CREATE INDEX IF NOT EXISTS idx_members_phone ON public.members (phone_number);
CREATE INDEX IF NOT EXISTS idx_members_expiry ON public.members (expiry_date);

-- 2. Tabel Check-Ins (Log Kedatangan Resepsionis)
CREATE TABLE IF NOT EXISTS public.check_ins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id UUID REFERENCES public.members(id) ON DELETE CASCADE,
    member_code VARCHAR(50) NOT NULL,
    member_name VARCHAR(150) NOT NULL,
    check_in_time VARCHAR(20) NOT NULL,
    status_at_checkin VARCHAR(20) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tabel Lead Inquiries (Pendaftaran Minat dari Landing Page)
CREATE TABLE IF NOT EXISTS public.lead_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    phone_number VARCHAR(30) NOT NULL,
    plan_interest VARCHAR(100) NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Enable Row Level Security (RLS) & Berikan Akses Publik / Anon (Akses Cepat)
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.check_ins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_inquiries ENABLE ROW LEVEL SECURITY;

-- Policy agar aplikasi Next.js dapat membaca dan menulis data
CREATE POLICY "Allow public read members" ON public.members FOR SELECT USING (true);
CREATE POLICY "Allow public insert members" ON public.members FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update members" ON public.members FOR UPDATE USING (true);
CREATE POLICY "Allow public delete members" ON public.members FOR DELETE USING (true);

CREATE POLICY "Allow public read check_ins" ON public.check_ins FOR SELECT USING (true);
CREATE POLICY "Allow public insert check_ins" ON public.check_ins FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public insert lead_inquiries" ON public.lead_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read lead_inquiries" ON public.lead_inquiries FOR SELECT USING (true);

-- 5. Data Awal (Seed Sample Members Gymqoo)
INSERT INTO public.members (member_code, full_name, phone_number, gender, plan_name, start_date, expiry_date, status)
VALUES
    ('MBR-00101', 'Budi Santoso', '081234567890', 'L', 'Member 1 Bulan', CURRENT_DATE - INTERVAL '27 days', CURRENT_DATE + INTERVAL '3 days', 'EXPIRING_SOON'),
    ('MBR-00102', 'Siti Rahmawati', '085698765432', 'P', 'Member 3 Bulan', CURRENT_DATE - INTERVAL '89 days', CURRENT_DATE + INTERVAL '1 day', 'EXPIRING_SOON'),
    ('MBR-00103', 'Reza Pratama', '082199887766', 'L', 'Member 1 Bulan', CURRENT_DATE - INTERVAL '35 days', CURRENT_DATE - INTERVAL '5 days', 'EXPIRED'),
    ('MBR-00104', 'Ahmad Fauzi', '081344556677', 'L', 'Member 12 Bulan (1 Tahun)', CURRENT_DATE - INTERVAL '60 days', CURRENT_DATE + INTERVAL '305 days', 'ACTIVE'),
    ('MBR-00105', 'Dewi Lestari', '087811223344', 'P', 'Member 6 Bulan', CURRENT_DATE - INTERVAL '30 days', CURRENT_DATE + INTERVAL '150 days', 'ACTIVE'),
    ('MBR-00106', 'Kevin Sanjaya', '089655443322', 'L', 'Member 3 Bulan', CURRENT_DATE - INTERVAL '15 days', CURRENT_DATE + INTERVAL '75 days', 'ACTIVE')
ON CONFLICT (member_code) DO NOTHING;

