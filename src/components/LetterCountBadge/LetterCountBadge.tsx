import { Mail } from 'lucide-react';

import { formatCount } from '@/utils';

interface Props {
  count: number;
}

export const LetterCountBadge = ({ count }: Props) => {
  return (
    <span className="absolute inset-0">
      <span className="absolute top-0 left-0 p-[6px]">
        <span className="border-primary-300 flex items-center justify-center gap-1 rounded-full bg-neutral-700/90 px-1 py-0.5 text-[8px] font-medium text-neutral-50">
          <Mail size={8} />
          {formatCount(count)}
        </span>
      </span>
    </span>
  );
};
