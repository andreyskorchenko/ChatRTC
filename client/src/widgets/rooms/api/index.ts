import { z } from 'zod';
import { useState, useEffect } from 'react';
import { Room } from '@/entities/room/model';
import { SocketEvents } from '@/shared/model';
import { useSocketContext } from '@/shared/lib';

export const useRoomsApi = () => {
	const socket = useSocketContext();
	const [rooms, setRooms] = useState<Room[]>([]);

	useEffect(() => {
		if (!socket) return;

		socket.emit(SocketEvents.GET_LIST_ROOMS);
		socket.on(SocketEvents.SHARE_ROOMS, (response: unknown) => {
			try {
				const rooms = z
					.object({
						id: z.string(),
						name: z.string(),
						online: z.number(),
						timestamp: z.string()
					})
					.array()
					.parse(response);
				setRooms(rooms);
			} catch (err) {}
		});
	}, []);

	return [rooms];
};
