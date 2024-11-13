import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class DisconnectOfRoomDto {
	@IsString()
	@IsNotEmpty()
	@IsUUID('4')
	roomId: string;
}
