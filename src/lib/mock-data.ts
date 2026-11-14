import { Member, Plan } from "@/types";

// Helper to get formatted date string offset from today
export function getRelativeDate(offsetDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split("T")[0];
}

// Paket Member Normal: 1, 3, 6, 12 Bulan (Tanpa Bonus Perpanjangan)
export const initialPlans: Plan[] = [
  {
    id: "plan-daily",
    name: "Daily Pass (Harian)",
    duration_days: 1,
    price: 35000,
    features: [
      "Akses 1 hari penuh area beban & mesin",
      "Ruang full AC & kipas sirkulasi",
      "Fasilitas toilet & parkir gedung",
    ],
  },
  {
    id: "plan-1m",
    name: "Member 1 Bulan",
    duration_days: 30,
    price: 295000,
    features: [
      "Masa aktif 30 hari penuh",
      "Akses seluruh area beban & mesin Gymqoo",
      "Ruang latihan full AC & kipas sirkulasi",
      "Fasilitas toilet (restroom) & parkir depan",
    ],
  },
  {
    id: "plan-3m",
    name: "Member 3 Bulan",
    duration_days: 90,
    price: 800000,
    popular: true,
    badge: "Paling Diminati",
    features: [
      "Masa aktif 90 hari penuh",
      "Akses seluruh area beban & mesin Gymqoo",
      "Ruang latihan full AC & kipas sirkulasi",
      "Fasilitas toilet (restroom) & parkir depan",
    ],
  },
  {
    id: "plan-6m",
    name: "Member 6 Bulan",
    duration_days: 180,
    price: 1500000,
    features: [
      "Masa aktif 180 hari penuh",
      "Akses seluruh area beban & mesin Gymqoo",
      "Ruang latihan full AC & kipas sirkulasi",
      "Fasilitas toilet (restroom) & parkir depan",
    ],
  },
  {
    id: "plan-12m",
    name: "Member 12 Bulan (1 Tahun)",
    duration_days: 365,
    price: 0,
    price_display: "Menyusul",
    is_coming_soon: true,
    badge: "Segera Hadir",
    features: [
      "Masa aktif 365 hari penuh (1 tahun)",
      "Akses seluruh area beban & mesin Gymqoo",
      "Ruang latihan full AC & kipas sirkulasi",
      "Tarif spesial tahunan (segera diumumkan)",
    ],
  },
];

export const initialMembers: Member[] = [
  {
    id: "mem-1",
    member_code: "MBR-00101",
    full_name: "Budi Santoso",
    phone_number: "081234567890",
    gender: "L",
    plan_name: "Member 1 Bulan",
    start_date: getRelativeDate(-27),
    expiry_date: getRelativeDate(3), // Expiring in 3 days (H-3)
    status: "EXPIRING_SOON",
    last_reminded_at: null,
  },
  {
    id: "mem-2",
    member_code: "MBR-00102",
    full_name: "Siti Rahmawati",
    phone_number: "085698765432",
    gender: "P",
    plan_name: "Member 3 Bulan",
    start_date: getRelativeDate(-89),
    expiry_date: getRelativeDate(1), // Expiring in 1 day (H-1)
    status: "EXPIRING_SOON",
    last_reminded_at: null,
  },
  {
    id: "mem-3",
    member_code: "MBR-00103",
    full_name: "Reza Pratama",
    phone_number: "082199887766",
    gender: "L",
    plan_name: "Member 1 Bulan",
    start_date: getRelativeDate(-35),
    expiry_date: getRelativeDate(-5), // Expired 5 days ago
    status: "EXPIRED",
    last_reminded_at: null,
  },
  {
    id: "mem-4",
    member_code: "MBR-00104",
    full_name: "Ahmad Fauzi",
    phone_number: "081344556677",
    gender: "L",
    plan_name: "Member 12 Bulan (1 Tahun)",
    start_date: getRelativeDate(-60),
    expiry_date: getRelativeDate(305), // Active
    status: "ACTIVE",
    last_reminded_at: null,
  },
  {
    id: "mem-5",
    member_code: "MBR-00105",
    full_name: "Dewi Lestari",
    phone_number: "087811223344",
    gender: "P",
    plan_name: "Member 6 Bulan",
    start_date: getRelativeDate(-30),
    expiry_date: getRelativeDate(150), // Active
    status: "ACTIVE",
    last_reminded_at: null,
  },
  {
    id: "mem-6",
    member_code: "MBR-00106",
    full_name: "Kevin Sanjaya",
    phone_number: "089655443322",
    gender: "L",
    plan_name: "Member 3 Bulan",
    start_date: getRelativeDate(-15),
    expiry_date: getRelativeDate(75), // Active
    status: "ACTIVE",
    last_reminded_at: null,
  },
];
