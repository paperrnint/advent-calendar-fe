import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '크리스마스 어드벤트 캘린더',
  description: '친구의 어드벤트 캘린더에 편지를 보내보세요 💌',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="flex h-dvh flex-col items-center">
        {children}
        <div id="portal"></div>
      </body>
    </html>
  );
}
