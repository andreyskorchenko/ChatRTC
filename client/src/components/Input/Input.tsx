import { InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import { SizeTypes } from '@/types';
import styles from './Input.module.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  sizeType?: SizeTypes;
  className?: string;
}

export const Input = ({ sizeType = 'm', className, ...attrs }: Props) => {
  const classesInput = classNames(styles.input, styles[`input_size_${sizeType}`], className);
  return <input {...attrs} className={classesInput} />;
};
