/* eslint-disable react-hooks/error-boundaries */
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { AdventCalendar } from '@/components/AdventCalendar/AdventCalendar';
import { fetchApi } from '@/lib/api/fetch';
import { UserDataResponse } from '@/types/api';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = await params;

  try {
    const { data: userData } = await fetchApi<UserDataResponse>(`/api/users/${id}`);

    return {
      title: `${userData.name}님의 어드벤트 캘린더 💌`,
      description: '친구의 어드벤트 캘린더에 편지를 보내보세요',
      openGraph: {
        title: `${userData.name}님의 어드벤트 캘린더 💌`,
        description: '친구의 어드벤트 캘린더에 편지를 보내보세요',
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
