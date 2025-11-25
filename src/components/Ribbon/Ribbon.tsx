import Image from 'next/image';

import { RibbonColor, ribbonFilter } from '@/constants';

interface Props {
  color: RibbonColor;
  name?: string;
}

export const Ribbon = ({ color, name }: Props) => {
  return (
    <div className="relative w-full">
      <Image
        className="h-auto w-full"
        priority
        src="/images/ribbon.webp"
        alt="리본 장식"
        width={901}
        height={340}
        style={{ filter: ribbonFilter[color] }}
      />
      {name && (
        <div className="absolute top-[60%] bottom-[40%] left-1/2 flex -translate-x-1/2 items-center justify-center py-4">
          <h1 className="font-handwrite text-2xl">
            <span className="bg-background/50 rounded-t-4xl border-b-6 border-b-black/40 px-4 pt-2 pb-1 text-neutral-700">
              {name}
            </span>
          </h1>
        </div>
      )}
    </div>
  );
};
