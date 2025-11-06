'use client';

import { LetterData } from '@/types/data';
import { Letter } from '../Letter/Letter';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ShareButton } from '../ShareButton/ShareButton';

interface Props {
  letters: LetterData[];
}

export const LetterCarousel = ({ letters }: Props) => {
  const [curIndex, setCurIndex] = useState(0);

  const maxIndex = letters.length - 1;
  const curLetter = letters[curIndex];

  const goToNext = () => {
    setCurIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const goToPrev = () => {
    setCurIndex((prev) => Math.max(prev - 1, 0));
  };

  if (letters.length === 0) {
    return (
      <div className="relative">
        <Letter.Container>
          <div className="p-2 pb-8 text-center text-xs text-neutral-500">
            <p>앗, 오늘은 받은 편지가 없어요</p>
            <p>링크를 공유하고 편지를 받아보세요 💌</p>
          </div>
          <div className="text-center">
            <ShareButton />
          </div>
        </Letter.Container>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* current letter */}
      <Letter.Container>
        <Letter.Content fixedHeight>{curLetter.content}</Letter.Content>
        <Letter.Footer from={curLetter.from} date={curLetter.date} />
      </Letter.Container>

      {/* navigation */}
      <div className="pointer-events-none">
        {curIndex > 0 && (
          <button
            onClick={goToPrev}
            disabled={curIndex === 0}
            className="pointer-events-auto absolute top-1/2 left-4 z-50 mr-4 -translate-x-full -translate-y-1/2 cursor-pointer rounded-full bg-white p-2 shadow-sm disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="이전 편지"
          >
            <ChevronLeft className="text-primary-green" strokeWidth={1.4} />
          </button>
        )}
        {curIndex < maxIndex && (
          <button
            onClick={goToNext}
            disabled={curIndex === maxIndex}
            className="pointer-events-auto absolute top-1/2 right-4 z-50 ml-4 translate-x-full -translate-y-1/2 cursor-pointer rounded-full bg-white p-2 shadow-sm disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="다음 편지"
          >
            <ChevronRight className="text-primary-green" strokeWidth={1.4} />
          </button>
        )}
      </div>
    </div>
  );
};
