import type { Metadata } from 'next';

import { AuthProvider } from '@/components/AuthProvider/AuthProvider';
import { GoogleAnalytics } from '@/components/GoogleAnalytics/GoogleAnalytics';
import { QueryProvider } from '@/components/QueryProvider/QueryProvider';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || 'https://www.2025-advent-calendar.site';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: '2025 어드벤트 캘린더 💌',
  description: '친구의 어드벤트 캘린더에 편지를 보내보세요',
  keywords: [
    '어드벤트 캘린더 편지',
    '어드벤트 캘린더',
    '크리스마스',
    '편지',
    '2025 크리스마스',
    '크리스마스 편지',
  ],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: siteUrl,
    siteName: '2025 어드벤트 캘린더 💌',
    description: '링크를 공유하고 편지를 받아보세요',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: '갑차기스러운데 나한테 편지 써줘도 돼?',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '2025 어드벤트 캘린더 💌',
    description: '링크를 공유하고 편지를 받아보세요',
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    other: {
      'naver-site-verification': process.env.NEXT_PUBLIC_NAVER_VERIFICATION || '',
    },
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
