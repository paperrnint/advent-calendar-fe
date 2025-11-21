import Image from 'next/image';

import { HomeAction } from '@/components/HomeAction/HomeAction';
import { PreviewCalendar } from '@/components/PreviewCalendar/PreviewCalendar';
import { Ribbon } from '@/components/Ribbon/Ribbon';

export default function Home() {
  return (
    <div className="relative h-dvh w-full max-w-md">
      {/* 배경 레이어 */}
      <div className="absolute top-0 right-0 bottom-[164px] left-0 flex items-center justify-center p-8 opacity-30 blur-xs">
        <div>
          <Ribbon color="green" />
          <PreviewCalendar />
        </div>
      </div>

      {/* 컨텐츠 레이어 */}
      <div className="relative z-10 flex h-full flex-col">
        <header className="mt-6 flex flex-1 flex-col items-center justify-center pb-14">
          <Image priority src="/images/santa-face.webp" width={120} height={120} alt="산타" />
          <h1 className="font-jeju text-center text-2xl leading-9 text-neutral-800">
            <span className="block">2 0 2 5</span>
            <span className="block">Advent Calendar</span>
          </h1>
        </header>

        <section className="flex w-full shrink-0 flex-col p-4">
          <HomeAction />
        </section>
      </div>
    </div>
  );
}
