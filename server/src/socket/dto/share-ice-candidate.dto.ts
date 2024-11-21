import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class ShareIceCandidateDto {
	@IsString()
	@IsNotEmpty({ message: 'Room id cannot be empty' })
	@IsUUID('4')
	roomId: string;

	@IsString()
	@IsNotEmpty({ message: 'Peer id cannot be empty' })
	peerId: string;

	candidate: RTCIceCandidate;
}
