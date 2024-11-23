import { Popup } from '@/shared/ui';
import { CreateRoom } from '@/features/createRoom/ui';
import { CreateRoomPopupProps } from './CreateRoomPopup.props';
import styles from './CreateRoomPopup.module.scss';

export const CreateRoomPopup = ({ opened, closeHandle }: CreateRoomPopupProps) => {
	return (
		<Popup
			opened={opened}
			headerRender={() => (
				<div className={styles.header}>
					<h4>Create room</h4>
					<p>Enter a room name and click the create button</p>
				</div>
			)}
			closeHandle={closeHandle}
		>
			<CreateRoom />
		</Popup>
	);
};
