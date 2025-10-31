'use client';

import Image from 'next/image';
import { useState } from 'react';

import { RibbonColor, ribbonFilter } from '@/constants';

interface Props {
  initialColor?: RibbonColor;
  onUpdate?: (color: RibbonColor) => void;
}

export const Palette = ({ initialColor, onUpdate }: Props) => {
  const [selected, setSelected] = useState(initialColor);

  const changeColor = (color: RibbonColor) => {
    setSelected(color);
    onUpdate?.(color);
  };

  const isSelected = (color: RibbonColor) => selected === color;

  return (
    <div className="flex flex-wrap gap-2">
      {(Object.keys(ribbonFilter) as RibbonColor[]).map((color) => (
        <button
          type="button"
          key={color}
          className={`relative h-12 w-12 overflow-hidden rounded-full ${
            isSelected(color) ? 'border-primary-red border-3' : ''
          }`}
          onClick={() => changeColor(color)}
        >
          <Image
            src="/images/ribbon.webp"
            alt="리본 장식"
            fill
            sizes="48px"
            className="object-cover object-center"
            style={{
              filter: ribbonFilter[color],
            }}
          />
        </button>
      ))}
    </div>
  );
};
