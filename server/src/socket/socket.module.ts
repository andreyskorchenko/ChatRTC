import { Module } from '@nestjs/common';
import { SocketGateway } from '@/socket/socket.gateway';
import { MessageModule } from '@/message/message.module';

@Module({
	imports: [MessageModule],
	providers: [SocketGateway]
})
export class SocketModule {}
