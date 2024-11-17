import { Module } from '@nestjs/common';
import { SocketGateway } from '@/socket/socket.gateway';

@Module({
	providers: [SocketGateway]
})
export class SocketModule {}
