import { ChangeEvent, InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ onChange, ...attrs }: Props) => {
  return <input {...attrs} onChange={onChange} />;
};
