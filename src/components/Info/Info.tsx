interface Props {
  children: React.ReactNode;
}

export const Info = ({ children }: Props) => {
  return (
    <div className="bg-primary-400/30 border-primary-300 rounded-xl border p-2 text-xs text-neutral-700">
      {children}
    </div>
  );
};
