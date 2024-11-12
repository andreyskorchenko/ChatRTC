import { InputHTMLAttributes } from 'react';
import { Sizes } from '@/shared/model';

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
	size?: Sizes;
};
