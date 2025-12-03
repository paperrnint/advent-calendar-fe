'use client';

import html2canvas from 'html2canvas-pro';
import { Download } from 'lucide-react';

interface Props {
  from: string;
  date: string;
  letterRef: React.RefObject<HTMLDivElement | null>;
}

export const DownloadButton = ({ from, date, letterRef }: Props) => {
  const download = async () => {
    if (!letterRef.current) return;

    let clonedElement: HTMLElement | null = null;

    try {
      clonedElement = letterRef.current.cloneNode(true) as HTMLElement;

      Object.assign(clonedElement.style, {
        position: 'absolute',
        left: '-9999px',
        top: '0',
        width: letterRef.current.offsetWidth + 'px',
      });

      // 스크롤 영역 확장
      const scrollElements = clonedElement.querySelectorAll('.overflow-auto, .max-h-90');
      scrollElements.forEach((el) => {
        (el as HTMLElement).style.maxHeight = 'none';
        (el as HTMLElement).style.overflow = 'visible';
      });

      // 저장 버튼 숨기기
      const saveButtons = clonedElement.querySelectorAll('[aria-label="편지 저장"]');
      saveButtons.forEach((btn) => {
        (btn as HTMLElement).style.display = 'none';
      });

      // 모든 자식 요소에 letter-spacing 적용 (canvas word-break 문제 fix)
      const allChildren = clonedElement.querySelectorAll('*');
      allChildren.forEach((el) => {
        Object.assign((el as HTMLElement).style, {
          letterSpacing: '0.9px',
        });
      });

      document.body.appendChild(clonedElement);
      await new Promise((resolve) => setTimeout(resolve, 100));

      const canvas = await html2canvas(clonedElement, {
        backgroundColor: 'transparent',
        scale: 3,
        useCORS: true,
        logging: false,
        windowWidth: 800,
      });

      document.body.removeChild(clonedElement);

      const link = document.createElement('a');
      link.download = `${date} ${from}의 편지.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('이미지 저장 실패:', error);

      if (clonedElement && document.body.contains(clonedElement)) {
        document.body.removeChild(clonedElement);
      }
    }
  };

  return (
    <button
      className="-m-1 shrink-0 rounded-full bg-neutral-100 p-2"
      onClick={download}
      aria-label="편지 저장"
    >
      <Download size={16} className="text-neutral-700" />
    </button>
  );
};
