import Link from 'next/link';
import { Icon } from '../Icon/Icon';

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center">
      <span>
        <Icon number={1} size={40} />
      </span>
      <span className="font-jeju flex flex-col text-[6px]">
        <span>2025</span>
        <span>Advent</span>
        <span>Calendar</span>
      </span>
    </Link>
  );
};
