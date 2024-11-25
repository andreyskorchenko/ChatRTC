import { Room } from '@/entities/room/ui';
import { useRooms } from '../lib';
import styles from './Rooms.module.scss';
import { RoomsEmpty } from './RoomsEmpty';

export const Rooms = () => {
	const { rooms } = useRooms();

	if (!rooms.length) {
		return <RoomsEmpty />;
	}

	return (
		<div className={styles.rooms}>
			{rooms.map(({ id, name, online }) => (
				<Room key={id} info={{ id, name, online }} />
			))}
		</div>
	);
};
