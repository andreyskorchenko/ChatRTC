import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext, useLocalStorage } from '@/shared/lib';
import { Input, Button } from '@/shared/ui';
import styles from './Auth.module.scss';

export const Auth = () => {
	const [username, setUsername] = useState('');
	const userContext = useUserContext();
	const { set } = useLocalStorage();
	const navigate = useNavigate();

	useEffect(() => {
		if (userContext.username) {
			navigate('/', { replace: true });
		}
	}, [userContext]);

	const submitHandle = () => {
		const name = username.trim();
		if (username.length && set('auth', { username: name })) {
			userContext.setUsername(name);
		}
	};

	return (
		<div className={styles.auth}>
			<div className={styles.auth__form}>
				<Input
					className={styles.auth__input}
					name="username"
					maxLength={26}
					autoFocus
					placeholder="Enter you name for connect to rooms"
					onChange={({ target: { value } }) => setUsername(value)}
					value={username}
				/>

				<Button type="primary" disabled={!username.trim().length} onClick={submitHandle}>
					Sign in
				</Button>
			</div>
		</div>
	);
};
