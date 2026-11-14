# GYMQOO FITNESS CENTER PETUNG — Web Application & Receptionist System

Aplikasi Web Modern untuk **Gymqoo Fitness Center** (Jl. Mawar No. 10, RT. 001, Petung, Penajam Paser Utara, Kalimantan Timur 76143).

Menggabungkan **Landing Page Profil Interaktif (3D Three.js & Framer Motion)** dan **Dashboard Operasional Resepsionis Gym (Back-Office Management)** dengan integrasi WhatsApp Click-to-Chat dan Cloud Database Supabase.

---

## 🌟 Fitur Utama

### 1. Public Landing Page (Pengunjung & Calon Member)
- **Interactive 3D Equipment (Three.js):** Dumbbell hexagonal 3D 20 KG interaktif dengan pencahayaan neon sporty yang dapat dirotasi 360° menggunakan kursor/touch.
- **Pill Dock Floating Navbar:** Desain navigasi mengambang di desktop dan mobile bottom-dock sesuai tren UI modern.
- **Fasilitas Lengkap:** Free weights zone, stasiun mesin beban & kabel, ruang full AC & kipas sirkulasi blower kencang, toilet/restroom bersih, dan parkir luas.
- **Galeri Suasana Gym:** Eksplorasi 4 zona latihan Gymqoo dengan filter kategori.
- **Pilihan Paket Simetris:**
  - *Daily Pass (Harian):* Rp 35.000 / Hari (Tiket non-member)
  - *Member 1 Bulan:* Rp 295.000
  - *Member 3 Bulan:* Rp 800.000 *(Paling Diminati)*
  - *Member 6 Bulan:* Rp 1.500.000
  - *Member 12 Bulan:* Segera Hadir / Menyusul
- **Kalkulator BMI Interaktif:** Pengunjung dapat menghitung Indeks Massa Tubuh mereka secara instan dan langsung berkonsultasi via WhatsApp.
- **Bukti Sosial & Testimoni:** Ulasan terverifikasi dan badge skor resmi Google Maps 4.5/5.0.
- **Pertanyaan Populer (FAQ):** Panduan bagi pemula, perlengkapan wajib, kenyamanan wanita, dan kebijakan membership.
- **Formulir Pendaftaran Minat WhatsApp:** Formulir langsung terhubung ke nomor resepsionis Gymqoo (`0853-9344-4424`).
- **Peta Lokasi & Navigasi GPS:** Google Maps resmi Gymqoo Petung lengkap dengan rute panduan suara.

### 2. Back-Office Receptionist & Admin Dashboard (`/admin`)
- **Portal Login Resepsionis (`/admin/login`):** Keamanan sistem resepsionis (`admin` / `admin`).
- **Collapsible Sidebar:** Sidebar navigasi yang dapat dibuka-tutup (*collapsible*).
- **Scanner Kartu Fisik (Offline Check-In):** Resepsionis cukup memasukkan nomor kartu fisik (misal: `MBR-00101`) atau nomor HP untuk validasi status kedatangan secara instan.
- **Pengingat Tagihan WhatsApp 1-Klik (`wa.me` Click-to-Chat):** Template otomatis bebas biaya API bulanan untuk status H-7, H-3, H-1, Hari H, dan Kadaluarsa.
- **Modal Perpanjangan & Edit Tanggal Fleksibel:** Staf dapat memperpanjang dengan durasi paket otomatis atau menentukan tanggal kadaluarsa secara manual dan bebas.
- **Generator & Cetak Kartu Member:** Desain kartu fisik siap cetak ke printer kartu / kertas cardstock.
- **Menu Pendaftar Baru (Leads):** Rekap seluruh pengunjung yang mengisi formulir minat di website beserta tombol 1-klik follow-up WhatsApp.
- **Ekspor Data ke Excel & Cetak Rekap:** Unduh data member ke format `.csv` atau cetak rekapitulasi fisik.
- **Notifikasi Toast Glassmorphism:** Efek visual modern menggantikan alert bawaan browser.

---

## 🛠️ Tech Stack
- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS + Dark/Light Theme Switching
- **3D Graphics:** Three.js
- **Database:** Supabase Cloud Database + LocalStorage Offline Fallback
- **Icons:** Lucide React

---

## ⚡ Cara Menjalankan Proyek Secara Lokal

1. **Clone repositori:**
   ```bash
   git clone https://github.com/Ilhamddy/gymqoo.git
   cd gymqoo
   ```

2. **Install dependensi:**
   ```bash
   npm install
   ```

3. **Konfigurasi Environment (`.env.local`):**
   Salin `.env.example` ke `.env.local` lalu isi konfigurasi:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   NEXT_PUBLIC_GYM_WA_NUMBER=6285393444424
   NEXT_PUBLIC_GYM_NAME="Gymqoo"
   ```

4. **Jalankan Skrip Database Supabase:**
   Jalankan seluruh skrip SQL di file `supabase-schema.sql` pada menu **SQL Editor** di dashboard Supabase Anda.

5. **Jalankan Development Server:**
   ```bash
   npm run dev
   ```
   Buka [http://localhost:3000](http://localhost:3000) untuk Landing Page dan [http://localhost:3000/admin](http://localhost:3000/admin) untuk Dashboard Resepsionis (Username: `admin`, Password: `admin`).
