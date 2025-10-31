import { X } from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onClear?: () => void;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const FormContainer = ({ children }: Props) => {
  return <div className="w-full rounded-xl border border-neutral-200 bg-white p-6">{children}</div>;
};

const FormHeader = ({ children }: Props) => {
  return <div className="mb-4">{children}</div>;
};

const FormSubtitle = ({ children }: Props) => {
  return <p className="mb-2 leading-7 text-neutral-500">{children}</p>;
};

const FormTitle = ({ children }: Props) => {
  return <p className="mb-2 leading-7 font-medium text-neutral-700">{children}</p>;
};

const FormForm = ({ children, ...props }: FormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onSubmit?.(e);
  };

  return (
    <form className="w-full" onSubmit={handleSubmit} {...props}>
      {children}
    </form>
  );
};

const InlineContainer = ({ children }: Props) => {
  return <div className="flex w-full gap-2">{children}</div>;
};

const Input = ({ value, onClear, ...props }: InputProps) => {
  return (
    <div className="flex flex-1 rounded-lg bg-neutral-100">
      <input
        type="text"
        value={value}
        className="w-full bg-transparent px-3 py-2 text-lg text-neutral-900 outline-none"
        {...props}
      />
      {value.length > 0 && onClear && (
        <button
          type="button"
          className="mx-2 my-auto flex h-fit rounded-full bg-neutral-300 p-0.5 text-neutral-100"
          onClick={onClear}
        >
          <X size={10} strokeWidth={3} />
        </button>
      )}
    </div>
  );
};

const FormAction = ({ children }: Props) => {
  return <div className="mt-4 flex justify-end gap-2">{children}</div>;
};

const Confirm = ({ disabled, ...props }: ButtonProps) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`bg-primary-red h-11 shrink-0 cursor-pointer rounded-lg px-4 py-1 text-white ${disabled ? 'cursor-default opacity-50' : 'cursor-pointer'} `}
      {...props}
    >
      확인
    </button>
  );
};

const Cancel = ({ disabled, ...props }: ButtonProps) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`h-11 shrink-0 cursor-pointer rounded-lg bg-neutral-100 px-4 py-1 text-neutral-600 ${disabled ? 'cursor-default opacity-50' : 'cursor-pointer'} `}
      {...props}
    >
      이전
    </button>
  );
};

export const Form = {
  Container: FormContainer,
  Header: FormHeader,
  Subtitle: FormSubtitle,
  Title: FormTitle,
  Form: FormForm,
  InlineContainer,
  Input,
  Action: FormAction,
  Confirm,
  Cancel,
};
