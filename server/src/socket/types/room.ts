import { Socket } from 'socket.io';

export type Room = {
	id: string;
	clients: Socket[];
	timestamp: string;
};

export type ResponseListRoom = Pick<Room, 'id' | 'timestamp'> & {
	name: string;
	online: number;
};
