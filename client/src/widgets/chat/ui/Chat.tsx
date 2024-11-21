import { Message } from '@/entities/message/ui';
import { SendMessage } from '@/features/sendMessage/ui';

import { useMessagesApi } from '../api';
import { ChatProps } from './Chat.props';
import styles from './Chat.module.scss';

export const Chat = ({ roomId }: ChatProps) => {
	const [messages] = useMessagesApi(roomId);

	return (
		<div className={styles.chat}>
			<div className={styles.chat__messages}>
				{messages.map((message) => (
					<Message key={message.id} message={message} />
				))}
			</div>

			<div className={styles.chat__panel}>
				<SendMessage roomId={roomId} />
			</div>
		</div>
	);
};
