import styles from './RoomsEmpty.module.scss';

export const RoomsEmpty = () => {
	return (
		<div className={styles['rooms-empty']}>
			<p>
				There are no rooms to connect to.
				<br /> You can create your first room using the <span>create room</span> button
			</p>
		</div>
	);
};
