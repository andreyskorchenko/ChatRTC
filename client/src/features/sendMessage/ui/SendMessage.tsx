import { useState, ChangeEvent, KeyboardEvent } from 'react';
import { Input } from '@/shared/ui';
import { useMessageApi } from '../api';
import { SendMessageProps } from './SendMessage.props';
import styles from './SendMessage.module.scss';

export const SendMessage = ({ roomId }: SendMessageProps) => {
	const [send] = useMessageApi(roomId);
	const [message, setMessage] = useState('');

	const changeMessage = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
		setMessage(value);
	};

	const enterMessage = ({ key }: KeyboardEvent<HTMLInputElement>) => {
		if (key !== 'Enter') return;
		send(message);
		setMessage('');
	};

	return (
		<Input
			className={styles['send-message']}
			onKeyUp={enterMessage}
			onChange={changeMessage}
			value={message}
			placeholder="Typing message and press ENTER"
		/>
	);
};
