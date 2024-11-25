import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class GetListMessagesDto {
	@IsString()
	@IsNotEmpty()
	@IsUUID('4')
	roomId: string;
}
