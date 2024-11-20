import { SocketEvents } from '@/shared/model';
import { useSocketContext } from '@/shared/lib';

export const messageApi = (roomId?: string) => {
	const socket = useSocketContext();

	return (message: string) => {
		if (!socket) return;
		socket.emit(SocketEvents.SEND_MESSAGE, { roomId, message });
	};
};
