import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class SendMessageDto {
	@IsString()
	@IsNotEmpty()
	@IsUUID('4')
	roomId: string;

	@IsString()
	@IsNotEmpty()
	message: string;
}
