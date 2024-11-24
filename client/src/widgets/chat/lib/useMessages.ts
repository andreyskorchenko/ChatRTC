import { useEffect, useState } from 'react';
import { MessageSchema, MessageType } from '@/entities/message/model';
import { useSocketContext } from '@/shared/lib';

export const useMessages = (roomId?: string) => {
	const { pub, sub, unSub } = useSocketContext();
	const [messages, setMessages] = useState<MessageType[]>([]);

	useEffect(() => {
		if (!roomId) return;
		pub('GET_LIST_MESSAGES', { roomId });
		sub('SHARE_MESSAGES', (response) => {
			try {
				const messages = MessageSchema.array()
					.parse(response)
					.sort((a, b) => {
						return b.timestamp.getTime() - a.timestamp.getTime();
					});
				setMessages(messages);
			} catch (err) {
				console.error(err);
			}
		});

		sub('SHARE_NEW_MESSAGE', (response) => {
			try {
				const message = MessageSchema.parse(response);
				setMessages((prev) => [message, ...prev]);
			} catch (err) {
				console.error(err);
			}
		});

		return () => {
			unSub('SHARE_MESSAGES');
			unSub('SHARE_NEW_MESSAGE');
		};
	}, [roomId]);

	return { messages };
};
