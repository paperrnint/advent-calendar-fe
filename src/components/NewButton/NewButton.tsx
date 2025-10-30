interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const NewButton = ({ children, ...props }: Props) => {
  return (
    <button
      className="font-handwrite bg-primary-red rounded-full px-3 py-1 text-2xl text-white"
      {...props}
    >
      {children}
    </button>
  );
};
