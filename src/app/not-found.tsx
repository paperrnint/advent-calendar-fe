import Image from 'next/image';

import { LinkButton } from '@/components/LinkButton/LinkButton';

export default function NotFound() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="font-jeju text-primary-brown text-3xl">4 0 4</h2>
        <h2 className="font-jeju text-primary-brown text-xl">Page Not Found</h2>
        <p className="text-primary-brown font-handwrite mb-4 p-2 text-xs opacity-60">
          해당 페이지는 존재하지 않거나 삭제되었을 수 있습니다.
        </p>
      </div>
      <Image src="/images/santa-404.webp" priority width={160} height={206} alt="404 페이지" />
      <LinkButton href="/">홈으로</LinkButton>
    </div>
  );
}
