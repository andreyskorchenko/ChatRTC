import { PropsWithChildren, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import { Event, PubPayload, SubFn, SocketContext } from '@/shared/context';
// import { useUserContext } from '@/shared/lib';

export const SocketProvider = ({ children }: PropsWithChildren) => {
	// const { username } = useUserContext();
	const [isConnected, setIsConnected] = useState(false);
	const socket = useRef(
		io(import.meta.env.VITE_SOCKET_URL, {
			auth: {}
		})
	);

	socket.current.on('connect', () => {
		setIsConnected(true);
	});

	socket.current.on('disconnect', () => {
		setIsConnected(false);
	});

	const pub = (event: Event, payload?: PubPayload) => {
		socket.current.emit(event, payload);
	};

	const sub = <T,>(event: Event, fn: SubFn<T>) => {
		socket.current.on(event, fn);
	};

	const unSub = (event: Event, listener?: (...args: unknown[]) => void) => {
		socket.current.off(event, listener);
	};

	return <SocketContext.Provider value={{ isConnected, pub, sub, unSub }}>{children}</SocketContext.Provider>;
};
