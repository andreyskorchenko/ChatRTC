import { PropsWithChildren } from 'react';

export type OverlayProps = PropsWithChildren<{
	opened: boolean;
	closeHandle: () => void;
}>;
