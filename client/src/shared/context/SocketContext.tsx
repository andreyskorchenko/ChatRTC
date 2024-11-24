import { createContext } from 'react';
import { SocketEvents } from '@/shared/model';

export type Event = keyof typeof SocketEvents;
export type PubPayload = Record<string, unknown>;
export type SubFn<T> = (data: T) => void;
export type UnSubFn = (...args: unknown[]) => void;

type SocketContext = {
	isConnected: boolean;
	pub: (event: Event, payload?: PubPayload) => void;
	sub: <SubData>(event: Event, fn: SubFn<SubData>) => void;
	unSub: (event: Event, listener?: UnSubFn) => void;
};

export const SocketContext = createContext<SocketContext>({} as SocketContext);
