import { Loader2, LucideX } from 'lucide-react';
import { useState } from 'react';

import { Letter } from '../Letter/Letter';

interface Props {
  to: string;
  onClose?: () => void;
}

export const WriteLetter = ({ to, onClose }: Props) => {
  const [text, setText] = useState('');
  const [from, setFrom] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendLetter = () => {
    setIsLoading(true);

    const letter = { text, from };
    console.log(letter);

    setTimeout(() => {
      onClose?.();
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Letter.Container>
      <p className="text-lg">To. {to}</p>
      <Letter.Textarea rows={5} value={text} onChange={(e) => setText(e.target.value)} />
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
        disabled={isLoading}
      >
        {isLoading && <Loader2 className="mr-2 size-5 animate-spin" />}
        {isLoading ? '보내는 중...' : '보내기'}
      </button>
    </Letter.Container>
  );
};
