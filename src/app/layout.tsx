import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import UpdateNotification from '@/components/update-notification';
import ServiceWorkerRegistration from '@/components/service-worker-registration';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Progressify',
  description: 'A Progressive Web App for progress tracking and enhanced user experience.',
  manifest: '/manifest.json', // Link to the PWA manifest
};

export const viewport: Viewport = {
  themeColor: '#3498db', // Corresponds to theme_color in manifest
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}>
        {children}
        <Toaster />
        <UpdateNotification />
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
