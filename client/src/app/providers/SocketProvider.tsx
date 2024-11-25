import { io } from 'socket.io-client';
import { PropsWithChildren, useRef } from 'react';
import { Event, PubPayload, SubFn, SocketContext } from '@/shared/context';
import { useUserContext } from '@/shared/lib';

export const SocketProvider = ({ children }: PropsWithChildren) => {
	const { username } = useUserContext();
	const socket = useRef(
		io(import.meta.env.VITE_SOCKET_URL, {
			auth: { username }
		})
	);

	const pub = (event: Event, payload?: PubPayload) => {
		socket.current.emit(event, payload);
	};

	const sub = <T,>(event: Event, fn: SubFn<T>) => {
		socket.current.on(event, fn);
	};

	const unSub = (event: Event, listener?: (...args: unknown[]) => void) => {
		socket.current.off(event, listener);
	};

	return <SocketContext.Provider value={{ pub, sub, unSub }}>{children}</SocketContext.Provider>;
};
