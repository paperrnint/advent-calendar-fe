import { Loader2, LucideX } from 'lucide-react';
import { useState } from 'react';

import { Letter } from '../Letter/Letter';
import { useWriteLetter } from '@/hooks/useWriteLetter';

interface Props {
  to: string;
  day: number;
  uuid: string;
  onClose?: () => void;
  onSuccess?: () => void;
}

export const WriteLetter = ({ to, day, uuid, onClose, onSuccess }: Props) => {
  const [content, setContent] = useState('');
  const [from, setFrom] = useState('');
  const { sendLetterMutation, isPending } = useWriteLetter({ uuid, onClose, onSuccess });

  const isValid = content.trim().length > 0;

  const sendLetter = () => {
    if (!isValid) {
      return;
    }

    sendLetterMutation({
      day,
      content,
      fromName: from.trim().length === 0 ? '익명' : from,
    });
  };

  return (
    <Letter.Container>
      <p className="text-lg">To. {to}</p>
      <Letter.Textarea rows={5} value={content} onChange={(e) => setContent(e.target.value)} />
      <Letter.FooterInput value={from} onChange={(e) => setFrom(e.target.value)} />

      <button
        className="absolute top-2 right-2 cursor-pointer p-2 text-neutral-200"
        onClick={onClose}
      >
        <LucideX size={20} />
      </button>
      <button
        type="button"
        className="bg-primary-green/90 mt-4 inline-flex cursor-pointer items-center justify-center rounded-lg px-3 py-1 text-lg text-white disabled:cursor-not-allowed disabled:opacity-50"
        onClick={sendLetter}
        disabled={isPending || !isValid}
      >
        {isPending && <Loader2 className="mr-2 size-5 animate-spin" />}
        {isPending ? '보내는 중...' : '보내기'}
      </button>
    </Letter.Container>
  );
};
