import Image from 'next/image';

interface Props {
  number: number; // 1-25
  size?: number;
  className?: string;
  alt?: string;
}

export const Icon = ({ number, size = 80, className = '', alt }: Props) => {
  return (
    <Image
      src={`/images/${number}.webp`}
      alt={alt || `크리스마스 아이콘 ${number}`}
      width={size}
      height={size}
      className={className}
    />
  );
};
