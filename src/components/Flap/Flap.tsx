interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isOpened?: boolean;
}

export const Flap = ({ children, isOpened = false, ...props }: Props) => {
  const btnStyle = isOpened ? 'opacity-40' : 'cursor-pointer';

  return (
    <button
      className={`border-primary-300 bg-background-beige relative flex items-center justify-center rounded-lg border p-2 ${btnStyle}`}
      {...props}
    >
      {children}
    </button>
  );
};
