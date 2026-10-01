import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '../lib/auth-context';

export const metadata: Metadata = {
  title: 'Abhay Technicals — Admin Portal',
  description: 'Management portal for mobile spare parts catalogue, orders, and Delhivery fulfillment.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-surface-base text-content-primary">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
