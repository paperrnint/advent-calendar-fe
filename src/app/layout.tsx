import type { Metadata } from 'next';

import { AuthProvider } from '@/components/AuthProvider/AuthProvider';
import { GoogleAnalytics } from '@/components/GoogleAnalytics/GoogleAnalytics';
import { QueryProvider } from '@/components/QueryProvider/QueryProvider';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

export const metadata: Metadata = {
  title: '2025 어드벤트 캘린더 💌',
  description: '친구의 어드벤트 캘린더에 편지를 보내보세요',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: '2025 어드벤트 캘린더 💌',
    description: '링크를 공유하고 편지를 받아보세요',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: '갑차기스러운데 나한테 편지 써줘도 돼?',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '2025 어드벤트 캘린더 💌',
    description: '링크를 공유하고 편지를 받아보세요',
    images: ['/images/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="flex h-dvh flex-col items-center">
        <GoogleAnalytics />
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryProvider>
        <div id="portal"></div>
        <Toaster />
      </body>
    </html>
  );
}
