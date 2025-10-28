'use client';

import { Check } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { RibbonColor, ribbonFilter } from '@/constants';

interface Props {
  initialColor?: RibbonColor;
}

export const Palette = ({ initialColor }: Props) => {
  const [selected, setSelected] = useState(initialColor);

  const changeColor = (color: RibbonColor) => {
    setSelected(color);
  };

  const isSelected = (color: RibbonColor) => selected === color;

  return (
    <div className="flex flex-wrap gap-2">
      {(Object.keys(ribbonFilter) as RibbonColor[]).map((color) => (
        <button
          key={color}
          className={`relative h-10 w-10 overflow-hidden rounded-full ${
            isSelected(color) ? 'border-2 border-neutral-800' : ''
          }`}
          onClick={() => changeColor(color)}
        >
          <Image
            src="/images/ribbon.webp"
            alt="리본 장식"
            fill
            className="object-cover object-center"
            style={{
              filter: ribbonFilter[color],
              opacity: isSelected(color) ? 0.6 : 1,
            }}
          />
          {isSelected(color) && (
            <Check
              size={24}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-neutral-800"
              strokeWidth={3}
            />
          )}
        </button>
      ))}
    </div>
  );
};
