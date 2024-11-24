import { Room } from '@/entities/room/ui';
import { useRooms } from '../lib';
import styles from './Rooms.module.scss';

export const Rooms = () => {
	const { rooms } = useRooms();

	return (
		<div className={styles.rooms}>
			{rooms.map(({ id, name, online }) => (
				<Room key={id} info={{ id, name, online }} />
			))}
		</div>
	);
};
