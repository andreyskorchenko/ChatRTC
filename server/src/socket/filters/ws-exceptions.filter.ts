import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseWsExceptionFilter } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Events } from '@/socket/types';

@Catch()
export class WsExceptionsFilter extends BaseWsExceptionFilter {
	catch(_: never, host: ArgumentsHost) {
		const ws = host.switchToWs();
		const client = ws.getClient() as Socket;
		client.emit(Events.CREATE_ERROR_ROOM, 'Cannot be create room');
	}
}
