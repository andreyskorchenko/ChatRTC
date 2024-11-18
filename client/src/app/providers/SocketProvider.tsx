import { PropsWithChildren } from 'react';
import { SocketContext } from '@/shared/context';
import { io } from 'socket.io-client';

export const SocketProvider = ({ children }: PropsWithChildren) => {
	const socket = io(import.meta.env.VITE_SOCKET_URL);

	return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
