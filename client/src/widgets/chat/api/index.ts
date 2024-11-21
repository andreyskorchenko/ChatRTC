import { z } from 'zod';
import { useState, useEffect } from 'react';
import { Message } from '@/entities/message/model';
import { SocketEvents } from '@/shared/model';
import { useSocketContext } from '@/shared/lib';

export const useMessagesApi = (roomId?: string) => {
	const socket = useSocketContext();
	const [messages, setMessages] = useState<Message[]>([]);

	useEffect(() => {
		if (!socket) return;

		socket.emit(SocketEvents.GET_LIST_MESSAGES, { roomId });
		socket.on(SocketEvents.SHARE_MESSAGES, (response: unknown) => {
			try {
				const messages = z
					.object({
						id: z.string(),
						name: z.string(),
						message: z.string(),
						timestamp: z.string()
					})
					.array()
					.parse(response);
				setMessages(
					messages.toSorted(({ timestamp: a }, { timestamp: b }) => {
						return new Date(b).getTime() - new Date(a).getTime();
					})
				);
			} catch (err) {}
		});

		socket.on(SocketEvents.SHARE_NEW_MESSAGE, (response: unknown) => {
			try {
				const message = z
					.object({
						id: z.string(),
						name: z.string(),
						message: z.string(),
						timestamp: z.string()
					})
					.parse(response);
				setMessages((prev) => [message, ...prev]);
			} catch (err) {}
		});
	}, [socket]);

	return [messages];
};
