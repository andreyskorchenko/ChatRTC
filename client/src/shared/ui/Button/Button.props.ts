import { PropsWithChildren, ButtonHTMLAttributes } from 'react';
import { Sizes, Types } from '@/shared/model';

export type ButtonProps = PropsWithChildren<
	Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
		size?: Sizes;
		type?: Types;
	}
>;
