import { Room } from '@/entities/room/ui';
import { useRoomsApi } from '../api';
import styles from './Rooms.module.scss';

export const Rooms = () => {
	const [rooms] = useRoomsApi();

	return (
		<div className={styles.rooms}>
			{rooms.map(({ id, name, online }) => (
				<Room key={id} info={{ id, name, online }} />
			))}
		</div>
	);
};
