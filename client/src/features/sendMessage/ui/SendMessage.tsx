import { useState, KeyboardEvent } from 'react';
import { Input } from '@/shared/ui';
import { useSocketContext } from '@/shared/lib';
import { SendMessageProps } from './SendMessage.props';
import styles from './SendMessage.module.scss';

export const SendMessage = ({ roomId }: SendMessageProps) => {
	const [message, setMessage] = useState('');
	const { pub } = useSocketContext();

	const enterMessage = ({ key }: KeyboardEvent<HTMLInputElement>) => {
		if (key !== 'Enter') return;
		pub('SEND_MESSAGE', { roomId, message });
		setMessage('');
	};

	return (
		<Input
			className={styles['send-message']}
			autoFocus
			onKeyUp={enterMessage}
			onChange={({ target: { value } }) => setMessage(value)}
			value={message}
			placeholder="Typing message and press ENTER"
		/>
	);
};
