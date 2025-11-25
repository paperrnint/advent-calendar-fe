import Link, { LinkProps } from 'next/link';

interface Props extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

export const LinkButton = ({ children, ...props }: Props) => {
  return (
    <Link
      className="font-handwrite bg-primary-red rounded-full px-3 py-1 text-2xl text-white"
      {...props}
    >
      {children}
    </Link>
  );
};
