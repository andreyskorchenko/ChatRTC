import { useState, useEffect, KeyboardEvent } from 'react';
import { Input, Button } from '@/shared/ui';
import { useSocketContext } from '@/shared/lib';
import styles from './CreateRoom.module.scss';

export const CreateRoom = () => {
	const { pub, sub, unSub } = useSocketContext();
	const [roomName, setRoomName] = useState('');
	const isDisabled = !Boolean(roomName.trim().length);

	useEffect(() => {
		sub('CREATED_ROOM', () => setRoomName(''));

		return () => {
			unSub('CREATED_ROOM');
		};
	}, [sub, unSub]);

	const createHandle = () => {
		if (isDisabled) return;
		pub('CREATE_ROOM', { name: roomName.trim() });
	};

	const createEnterHandle = ({ key }: KeyboardEvent<HTMLInputElement>) => {
		if (isDisabled || key !== 'Enter') return;
		pub('CREATE_ROOM', { name: roomName.trim() });
	};

	return (
		<div className={styles.create}>
			<Input
				className={styles.create__input}
				placeholder="Room name"
				maxLength={25}
				autoFocus
				onKeyUp={createEnterHandle}
				onChange={({ target: { value } }) => setRoomName(value)}
				value={roomName}
			/>
			<Button type="primary" className={styles.create__button} disabled={isDisabled} onClick={createHandle}>
				CREATE
			</Button>
		</div>
	);
};
