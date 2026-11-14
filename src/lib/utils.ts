import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Member, MemberStatus } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDateIndo(dateStr: string): string {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function calculateDaysRemaining(expiryDateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = new Date(expiryDateStr);
  expiry.setHours(0, 0, 0, 0);

  const diffTime = expiry.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function deriveMemberStatus(expiryDateStr: string): MemberStatus {
  const days = calculateDaysRemaining(expiryDateStr);
  if (days < 0) return 'EXPIRED';
  if (days <= 7) return 'EXPIRING_SOON';
  return 'ACTIVE';
}

export function cleanPhoneForWhatsApp(phone: string): string {
  let cleaned = phone.replace(/\D/g, "");
  if (cleaned.startsWith("0")) {
    cleaned = "62" + cleaned.substring(1);
  }
  return cleaned;
}

export function generateWhatsAppReminderUrl(member: Member, gymName: string = "Gymqoo"): string {
  const days = calculateDaysRemaining(member.expiry_date);
  const formattedExpiry = formatDateIndo(member.expiry_date);
  const phone = cleanPhoneForWhatsApp(member.phone_number);

  let message = "";

  if (days > 0 && days <= 7) {
    // Segera habis
    message = `Halo Kak ${member.full_name}! 💪\n\n` +
      `Mengingatkan dari *${gymName}*, masa aktif membership paket *${member.plan_name}* Kakak (No. Kartu: *${member.member_code}*) akan berakhir pada *${formattedExpiry}* (${days} hari lagi).\n\n` +
      `Agar rutinitas latihan Kakak tetap nyaman dan tidak terputus, yuk lakukan perpanjangan saat berkunjung di meja resepsionis.\n\n` +
      `Sampai jumpa di gym & salam sehat! 🔥🏋️‍♂️`;
  } else if (days === 0) {
    // Hari H kadaluarsa
    message = `Halo Kak ${member.full_name}! ⚠️\n\n` +
      `Hari ini (*${formattedExpiry}*) adalah hari terakhir masa aktif membership *${gymName}* Kakak (No. Kartu: *${member.member_code}*).\n\n` +
      `Jangan lupa untuk melakukan perpanjangan membership di meja resepsionis hari ini ya Kak.\n\n` +
      `Terima kasih dan tetap semangat latihannya! 💪🔥`;
  } else {
    // Sudah kadaluarsa
    const overdueDays = Math.abs(days);
    message = `Halo Kak ${member.full_name}! 🙏\n\n` +
      `Kami menginfokan bahwa keanggotaan *${gymName}* Kakak (No. Kartu: *${member.member_code}*) telah berakhir pada *${formattedExpiry}* (${overdueDays} hari yang lalu).\n\n` +
      `Kami siap menyambut kehadiran Kakak kembali untuk melanjutkan program kebugaran. Jika ingin memperpanjang, Kakak bisa langsung mampir ke resepsionis atau balas chat ini ya.\n\n` +
      `Salam sehat selalu! 🏋️‍♂️`;
  }

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function exportMembersToCsv(members: Member[]): void {
  const headers = [
    "No. Kartu",
    "Nama Lengkap",
    "Nomor WhatsApp",
    "Gender",
    "Paket Membership",
    "Tanggal Mulai",
    "Tanggal Kadaluarsa",
    "Sisa Hari",
    "Status Keanggotaan",
    "Terakhir Diingatkan WA",
  ];

  const rows = members.map((m) => {
    const days = calculateDaysRemaining(m.expiry_date);
    const statusText =
      m.status === "ACTIVE"
        ? "Aktif"
        : m.status === "EXPIRING_SOON"
        ? "Segera Habis"
        : "Expired";
    const reminded = m.last_reminded_at
      ? new Date(m.last_reminded_at).toLocaleString("id-ID")
      : "-";

    return [
      `"${m.member_code}"`,
      `"${m.full_name.replace(/"/g, '""')}"`,
      `"'${m.phone_number}"`,
      m.gender === "L" ? "Laki-laki" : "Perempuan",
      `"${m.plan_name}"`,
      m.start_date,
      m.expiry_date,
      days,
      statusText,
      `"${reminded}"`,
    ];
  });

  const csvContent =
    "\uFEFF" + [headers.join(","), ...rows.map((e) => e.join(","))].join("\r\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const dateStr = new Date().toISOString().split("T")[0];
  link.setAttribute("href", url);
  link.setAttribute("download", `gymqoo-rekap-member-${dateStr}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
