import { useQuery } from '@tanstack/react-query';

import { getLetterCount } from '@/lib/api/letter';

interface Props {
  uuid: string;
}

export const useLetterCount = ({ uuid }: Props) => {
  return useQuery({
    queryKey: ['letterCount', uuid],
    queryFn: () => getLetterCount(uuid),
  });
};
