interface Props extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> {
  children: React.ReactNode;
  disabled?: boolean;
}

export const Flap = ({ children, disabled = false, ...props }: Props) => {
  const btnStyle = disabled ? 'opacity-60' : 'cursor-pointer';

  return (
    <button
      disabled={disabled}
      className={`border-primary-300 bg-background-beige relative flex items-center justify-center overflow-hidden rounded-lg border p-2 ${btnStyle}`}
      {...props}
    >
      {children}
    </button>
  );
};
