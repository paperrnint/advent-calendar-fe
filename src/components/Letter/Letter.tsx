interface Props {
  children: React.ReactNode;
}

interface ContentProps {
  children: React.ReactNode;
  fixedHeight?: boolean;
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

interface FooterProps {
  from: string;
  date: string;
}

interface FooterInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LetterContainer = ({ children }: Props) => {
  return (
    <div className="font-handwrite relative w-full rounded-2xl border border-neutral-200 bg-white p-4">
      <div className="flex h-full flex-col justify-between gap-2">{children}</div>
    </div>
  );
};

const LetterTextarea = ({ value, onChange, ...props }: TextareaProps) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      className="dotted-lines-bg w-full resize-none bg-transparent text-justify text-lg leading-9 outline-none"
      {...props}
    />
  );
};

const LetterContent = ({ children, fixedHeight }: ContentProps) => {
  return (
    <div className={`max-h-90 overflow-auto ${fixedHeight ? 'min-h-90' : ''}`}>
      <p className={`dotted-lines-bg text-justify text-lg leading-9 whitespace-pre-line`}>
        {children}
      </p>
    </div>
  );
};

const LetterFooter = ({ from, date }: FooterProps) => {
  return (
    <div className="flex items-center justify-end gap-2 text-neutral-600">
      <p>{date}</p>
      <p>{from} 씀</p>
    </div>
  );
};

const LetterFooterInput = ({ value, onChange }: FooterInputProps) => {
  return (
    <div className="flex items-center justify-end gap-2 text-neutral-600">
      <p>From.</p>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="rounded-lg bg-neutral-100 px-2 py-1 text-right outline-none"
        placeholder="익명"
      />
    </div>
  );
};

export const Letter = {
  Container: LetterContainer,
  Textarea: LetterTextarea,
  Content: LetterContent,
  Footer: LetterFooter,
  FooterInput: LetterFooterInput,
};
