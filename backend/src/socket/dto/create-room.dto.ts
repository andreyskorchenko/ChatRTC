import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateRoomDto {
	@IsString()
	@MaxLength(25, { message: 'Maximum room name length is 25 characters' })
	@IsNotEmpty({ message: 'Room name cannot be empty' })
	name: string;
}
