import { useEffect, useMemo, useState, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { z } from 'zod';
import { SocketEvents } from '@/shared/model';
import { useSocketContext } from '@/shared/lib';
import { Input, Button } from '@/shared/ui';
import styles from './Main.module.scss';

type Room = {
	id: string;
	name: string;
	online: number;
	timestamp: string;
};

export const Main = () => {
	const socket = useSocketContext();
	const [roomName, setRoomName] = useState('');
	const [rooms, setRooms] = useState<Room[]>([]);
	const navigate = useNavigate();
	const connectChat = (id: string) => {
		navigate(`/room/${id}`);
	};

	useEffect(() => {
		socket?.emit(SocketEvents.GET_LIST_ROOMS);

		socket?.on('connect', () => {
			console.log('[CLIENTID]:', socket.id);
		});

		socket?.on(SocketEvents.SHARE_ROOMS, (data) => {
			const rooms = z
				.object({
					id: z.string(),
					name: z.string(),
					online: z.number(),
					timestamp: z.string()
				})
				.array()
				.parse(data);
			setRooms(rooms);
		});

		socket?.on(SocketEvents.CREATE_ERROR_ROOM, (data) => {
			console.log(`[${SocketEvents.CREATE_ERROR_ROOM}]:`, data);
		});

		socket?.on(SocketEvents.CREATED_ROOM, () => setRoomName(''));
	}, [socket]);

	const createRoom = () => {
		socket?.emit(SocketEvents.CREATE_ROOM, { name: roomName });
	};

	const onEnter = ({ key }: KeyboardEvent) => {
		if (key === 'Enter') {
			createRoom();
		}
	};

	const sortedRooms = useMemo(() => {
		return rooms.toSorted(({ timestamp: a }, { timestamp: b }) => {
			return new Date(b).getTime() - new Date(a).getTime();
		});
	}, [rooms]);

	return (
		<div className={styles.main}>
			<div className={styles['create-room']}>
				<Input
					placeholder="Room name"
					maxLength={25}
					onKeyDown={onEnter}
					onChange={({ target: { value } }) =>
						setRoomName(value.trim().toLowerCase())
					}
					value={roomName}
				/>
				<Button
					type="primary"
					onClick={createRoom}
					disabled={!roomName.length}
				>
					Create
				</Button>
			</div>

			<div className={styles.rooms}>
				{sortedRooms.map((room) => (
					<div className={styles.room} key={room.id}>
						<div className={styles.room__container}>
							<Button
								type="primary"
								onClick={() => connectChat(room.id)}
								className={styles.room__button}
							>
								CONNECT TO
							</Button>

							<div className={styles.room__panel}>
								<div className={styles.room__name}>
									{room.name}
								</div>

								<div
									className={cn(styles.room__online, {
										[styles.room__online_true]: room.online
									})}
								>
									{room.online}
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
