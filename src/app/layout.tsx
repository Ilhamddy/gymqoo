import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gymqoo Fitness Center Petung | Pusat Kebugaran & Gym Penajam Paser Utara",
  description:
    "Gymqoo Fitness Center Petung: Gym modern dengan area beban lengkap, mesin latihan, ruangan full AC & kipas blower sirkulasi udara, toilet bersih, dan parkir luas di Penajam Paser Utara, Kaltim.",
  keywords: [
    "Gymqoo",
    "Gym Petung",
    "Gym Penajam",
    "Fitness Center Penajam Paser Utara",
    "Tempat Gym Kaltim",
    "Member Gym Petung",
    "Gym Full AC Petung",
    "Gymqoo Fitness",
  ],
  authors: [{ name: "Gymqoo Fitness Center" }],
  openGraph: {
    title: "Gymqoo Fitness Center Petung | Gym Modern Penajam Paser Utara",
    description:
      "Pusat kebugaran terlengkap di Petung. Free weights, mesin beban, full AC & sirkulasi udara sejuk, toilet, parkir luas. Rating 4.5/5 Google Maps.",
    siteName: "Gymqoo Fitness Center",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@400;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('gymqoo_theme');
                  if (saved === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased bg-[#F8FAFC] text-slate-900 dark:bg-[#090A0F] dark:text-zinc-100 min-h-screen transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}
