import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '../providers/auth-provider';
import { CartProvider } from '../providers/cart-provider';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { WhatsAppCTA } from '../components/common/WhatsAppCTA';
import { SeoStructuredData } from '../components/seo/SeoStructuredData';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://abhaytechnicals.com'),
  title: {
    default: 'ABHAY TECHNICALS — Mobile Spare Parts, Batteries & Repair Tools',
    template: '%s | ABHAY TECHNICALS',
  },
  description:
    'Genuine quality smartphone spare parts, mobile batteries, charging flex sub-boards, OCA touch glass, and repair tools for technicians and retailers across India.',
  keywords: [
    'mobile spare parts',
    'phone battery replacement',
    'charging port flex board',
    'OCA touch glass',
    'camera glass replacement',
    'Vivo spare parts',
    'Realme spare parts',
    'iPhone batteries OEM',
    'mobile technician wholesale',
  ],
  authors: [{ name: 'Abhay Technicals' }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://abhaytechnicals.com',
    siteName: 'Abhay Technicals',
    title: 'ABHAY TECHNICALS — Mobile Spare Parts & Tools Hub',
    description: 'Precision replacement parts and wholesale volume slabs for smartphone repair technicians in India.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <SeoStructuredData type="organization" />
      </head>
      <body className="min-h-screen flex flex-col bg-surface-base text-content-primary antialiased font-sans">
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-4 sm:py-6 pb-24 lg:pb-8">
              {children}
            </main>
            <Footer />
            <WhatsAppCTA isFloating />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
