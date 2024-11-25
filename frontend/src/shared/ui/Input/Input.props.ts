import { InputHTMLAttributes } from 'react';
import { ComponentSizes } from '@/shared/model';

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
	size?: ComponentSizes;
};
