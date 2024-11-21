import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class ShareSdpOfferDto {
	@IsString()
	@IsNotEmpty({ message: 'Room id cannot be empty' })
	@IsUUID('4')
	roomId: string;

	@IsString()
	@IsNotEmpty({ message: 'Peer id cannot be empty' })
	peerId: string;

	offer: RTCSessionDescription;
}
