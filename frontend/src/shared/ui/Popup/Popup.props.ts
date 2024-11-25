import { PropsWithChildren, ReactNode } from 'react';

export type PopupProps = PropsWithChildren<{
	opened: boolean;
	headerRender?: () => ReactNode;
	className?: string;
	closeHandle: () => void;
}>;
