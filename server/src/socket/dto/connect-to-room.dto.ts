import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class ConnectToRoomDto {
	@IsString()
	@IsNotEmpty({ message: 'Room id cannot be empty' })
	@IsUUID('4')
	roomId: string;
}
