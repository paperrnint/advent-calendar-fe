interface Props {
  children: React.ReactNode;
  isLoading?: boolean;
}

export const Info = ({ children, isLoading = false }: Props) => {
  const heightStyle = isLoading ? 'h-[50px]' : 'h-fit';
  return (
    <div
      className={`${heightStyle} bg-primary-400/30 border-primary-300 rounded-xl border p-2 text-xs text-neutral-700`}
    >
      {!isLoading && children}
    </div>
  );
};
