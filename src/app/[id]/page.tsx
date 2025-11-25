/* eslint-disable react-hooks/error-boundaries */
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { AdventCalendar } from '@/components/AdventCalendar/AdventCalendar';
import { fetchApi } from '@/lib/api/fetch';
import { UserDataResponse } from '@/types/api';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || 'https://www.2025-advent-calendar.site';

  try {
    const { data: userData } = await fetchApi<UserDataResponse>(`/api/users/${id}`);

    return {
      title: `${userData.name}님의 어드벤트 캘린더 💌`,
      description: `${userData.name}님에게 크리스마스 편지를 보내보세요`,
      openGraph: {
        title: `${userData.name}님의 어드벤트 캘린더 💌`,
        description: `${userData.name}님에게 크리스마스 편지를 보내보세요`,
        url: `${siteUrl}/${id}`,
      },
      twitter: {
        card: 'summary_large_image',
        title: `${userData.name}님의 어드벤트 캘린더 💌`,
        description: `${userData.name}님에게 크리스마스 편지를 보내보세요`,
      },
      alternates: {
        canonical: `${siteUrl}/${id}`,
      },
    };
  } catch (error) {
    return {
      title: '2025 어드벤트 캘린더 💌',
      description: '친구의 어드벤트 캘린더에 편지를 보내보세요',
    };
  }
}

export default async function AdventCalendarPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  try {
    const { data: userData } = await fetchApi<UserDataResponse>(`/api/users/${id}`);

    return <AdventCalendar owner={userData} pageUuid={id} />;
  } catch (error) {
    notFound();
  }
}
