import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
// Import HeroUIProvider
import { HeroUIProvider } from '@heroui/react';
import { ToastProvider } from '@heroui/toast';

// Configure fonts
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Metadata configuration
export const metadata: Metadata = {
  title: 'AidSphere',
  description: 'Donation platform',
};

/**
 * Root Layout Component
 * 
 * This layout wraps all pages and provides:
 * - Font configuration with Geist Sans and Geist Mono
 * - Theme management via ThemeProvider
 * - HeroUI component system via HeroUIProvider
 * 
 * The theme configuration supports:
 * - Primary colors (pink/magenta palette with #fa3a91 as default)
 * - Secondary colors (blue palette with #3298ff as default)
 * - Sidebar-specific color variables for navigation components
 * - Dark/light mode toggle support
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased`}
      >
       
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >

          <HeroUIProvider>
            <ToastProvider />
            {children}
          </HeroUIProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}