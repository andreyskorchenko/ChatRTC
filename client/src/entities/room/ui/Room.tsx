import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/ui';
import { RoomProps } from './Room.props';
import styles from './Room.module.scss';

export const Room = ({ info: { id, name, online } }: RoomProps) => {
	const navigate = useNavigate();

	return (
		<div className={styles.room}>
			<div className={styles.room__container}>
				<Button type="primary" className={styles.room__connect} onClick={() => navigate(`/room/${id}`)}>
					Connect
				</Button>

				<div className={styles.room__panel}>
					<div className={styles.room__name}>{name}</div>

					<div
						className={cn(styles.room__online, {
							[styles.room__online_true]: online
						})}
					>
						{online}
					</div>
				</div>
			</div>
		</div>
	);
};
