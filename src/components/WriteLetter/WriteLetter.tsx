import { LucideX } from 'lucide-react';
import { useState } from 'react';

import { Letter } from '../Letter/Letter';
import { USERNAME } from '@/constants';

interface Props {
  to: string;
  onClose?: () => void;
}

export const WriteLetter = ({ to, onClose }: Props) => {
  const [text, setText] = useState('');
  const [from, setFrom] = useState('');

  const sendLetter = () => {
    const letter = { text, from };
    console.log(letter);
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
        className="bg-primary-green/90 mt-4 cursor-pointer rounded-lg px-3 py-1 text-lg text-white"
        onClick={sendLetter}
      >
        보내기
      </button>
    </Letter.Container>
  );
};
