import { useEffect, useState } from 'react';
import { useSocketContext } from '@/shared/lib';
import { roomsSchema, RoomType } from '@/entities/room/model';

export const useRooms = () => {
	const { pub, sub, unSub } = useSocketContext();
	const [rooms, setRooms] = useState<RoomType[]>([]);

	useEffect(() => {
		pub('GET_LIST_ROOMS');
		sub('SHARE_ROOMS', (response) => {
			try {
				const rooms = roomsSchema
					.array()
					.parse(response)
					.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
				setRooms(rooms);
			} catch (err) {
				console.error(err);
			}
		});

		return () => {
			unSub('SHARE_ROOMS');
		};
	}, [pub, sub, unSub]);

	return { rooms };
};
