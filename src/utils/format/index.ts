export const formatCount = (count: number, max: number = 99): string => {
  return count > max ? `${max}+` : String(count);
};
