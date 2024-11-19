import { Room } from '../model';

export type RoomProps = {
	info: Pick<Room, 'id' | 'name' | 'online'>;
};
