import { PropsWithChildren, ButtonHTMLAttributes } from 'react';
import { ComponentSizes, ComponentTypes } from '@/shared/model';

export type ButtonProps = PropsWithChildren<
	Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
		size?: ComponentSizes;
		type?: ComponentTypes;
	}
>;
