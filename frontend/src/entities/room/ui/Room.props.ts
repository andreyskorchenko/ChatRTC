import { RoomType } from '../model';

export type RoomProps = {
	info: Pick<RoomType, 'id' | 'name' | 'online'>;
};
