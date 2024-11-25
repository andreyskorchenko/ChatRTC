import { Socket } from 'socket.io';

export type Message = Pick<Room, 'name' | 'timestamp'> & {
	id: string;
	message: string;
};

export type Room = {
	name: string;
	clients: Map<string, Socket>;
	messages: Message[];
	timestamp: string;
};

export type ResponseShareRoom = Pick<Room, 'timestamp'> & {
	id: string;
	name: string;
	online: number;
};
