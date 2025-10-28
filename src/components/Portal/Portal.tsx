import ReactDOM from 'react-dom';

interface Props {
  children: React.ReactNode;
}

export const Portal = ({ children }: Props) => {
  const element = typeof window !== 'undefined' && document.querySelector(`#portal`);

  return element && children ? ReactDOM.createPortal(children, element) : null;
};
