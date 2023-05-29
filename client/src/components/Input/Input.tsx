import { ChangeEvent } from 'react';
import { SizeTypesKeys, InputTypesKeys } from '@/types';
import styles from './Input.module.scss';
import cn from 'classnames';

interface Props {
  autoFocus: boolean;
  className?: string;
  maxLength?: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  size: SizeTypesKeys;
  type?: InputTypesKeys;
  value: string;
}

export const Input = ({
  autoFocus,
  className,
  maxLength,
  onChange,
  placeholder,
  size = 'm',
  type = 'text',
  value,
}: Props) => {
  return (
    <input
      autoFocus={autoFocus}
      className={cn(styles.input, styles[`input_size_${size}`], className)}
      maxLength={maxLength}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      value={value}
    />
  );
};
