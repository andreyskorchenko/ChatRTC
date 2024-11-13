import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class ConnectToRoomDto {
	@IsString()
	@IsNotEmpty()
	@IsUUID('4')
	roomId: string;
}
