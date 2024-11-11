import { InputHTMLAttributes } from 'react';

type Sizes = 'l' | 's' | 'm';
export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
	size?: Sizes;
};
