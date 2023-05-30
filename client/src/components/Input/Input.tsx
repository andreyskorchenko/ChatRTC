import { InputHTMLAttributes } from 'react';
import cn from 'classnames';
import { SizeTypes } from '@/types';
import styles from './Input.module.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  sizeType?: SizeTypes;
}

export const Input = ({ className, sizeType = 'm', onChange, ...attrs }: Props) => {
  const classes = cn(styles.input, styles[`input_size_${sizeType}`], className);
  return <input {...attrs} className={classes} onChange={onChange} />;
};
