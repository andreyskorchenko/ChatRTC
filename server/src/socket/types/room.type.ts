import { Socket } from 'socket.io';

export type RoomType = {
	name: string;
	clients: Map<string, Socket>;
	timestamp: string;
};

export type ResponseShareRoomType = Pick<RoomType, 'timestamp'> & {
	id: string;
	name: string;
	online: number;
};
