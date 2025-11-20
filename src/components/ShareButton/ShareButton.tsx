'use client';

import { LucideCheck, LucideShare } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

export const ShareButton = () => {
  const pathname = usePathname();
  const [isCopied, setIsCopied] = useState(false);

  const currentUrl = typeof window !== 'undefined' ? window.location.origin + pathname : '';
  const btnStyle = isCopied ? 'opacity-50' : 'cursor-pointer';

  const btnConfig = {
    share: {
      icon: LucideShare,
      text: '공유하기',
    },
    copied: {
      icon: LucideCheck,
      text: '복사됨',
    },
  } as const;

  const { icon: Icon, text } = btnConfig[isCopied ? 'copied' : 'share'];

  const share = async () => {
    const shareData = {
      title: '2025 어드벤트 캘린더',
      text: '공유하고 크리스마스 편지를 받아보세요 💌',
      url: currentUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(currentUrl);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      }
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        console.error('복사 실패:', err);
      }
    }
  };

  return (
    <button
      className={`font-handwrite bg-primary-red rounded-full px-3 py-1 text-2xl text-white ${btnStyle} `}
      disabled={isCopied}
      onClick={share}
    >
      <span className="flex items-center gap-2">
        <Icon size={20} />
        <span>{text}</span>
      </span>
    </button>
  );
};
