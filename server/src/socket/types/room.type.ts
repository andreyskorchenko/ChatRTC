import { Socket } from 'socket.io';

export type Room = {
	name: string;
	clients: Map<string, Socket>;
	timestamp: string;
};

export type ResponseShareRoom = Pick<Room, 'timestamp'> & {
	id: string;
	name: string;
	online: number;
};
