import { useState } from 'react';
import { Rooms } from '@/widgets/rooms/ui';
import { CreateRoomPopup } from '@/widgets/createRoomPopup/ui';
import { Button } from '@/shared/ui';
import styles from './Main.module.scss';

export const Main = () => {
	const [isOpened, setIsOpened] = useState(false);

	return (
		<div className={styles.main}>
			<Rooms />
			<CreateRoomPopup opened={isOpened} closeHandle={() => setIsOpened(false)} />

			<div className={styles.main__panel}>
				<Button type="primary" onClick={() => setIsOpened(true)}>
					Create room
				</Button>
			</div>
		</div>
	);
};
