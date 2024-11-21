import { MessageProps } from './Message.props';
import styles from './Message.module.scss';

export const Message = ({ message: { name, timestamp, message } }: MessageProps) => {
	const shortUsername = name.slice(0, 2).toUpperCase();
	const formattedDate = new Intl.DateTimeFormat('ru', {
		hour: '2-digit',
		minute: '2-digit'
	}).format(new Date(timestamp));

	return (
		<div className={styles.message}>
			<div className={styles.message__panel}>
				<div className={styles.message__userinfo}>
					<div className={styles.message__userpic}>{shortUsername}</div>
					<p>{name}</p>
				</div>

				<span>{formattedDate}</span>
			</div>

			<div className={styles.message__content}>{message}</div>
		</div>
	);
};
