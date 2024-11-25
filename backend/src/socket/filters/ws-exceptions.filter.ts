import { Catch, BadRequestException, ArgumentsHost } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { SocketEvents } from '@/socket/types';
import { Socket } from 'socket.io';

@Catch()
export class WsExceptionsFilter extends BaseWsExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		const ws = host.switchToWs();
		const client = ws.getClient<Socket>();

		if (exception instanceof BadRequestException) {
			const response = exception.getResponse();

			if (typeof response !== 'string' && 'message' in response && Array.isArray(response.message)) {
				return client.emit(SocketEvents.ERROR, { message: response.message });
			}

			client.emit(SocketEvents.ERROR, { message: ['Bad request'] });
		}

		if (exception instanceof WsException) {
			client.emit(SocketEvents.ERROR, { message: ['Bad request'] });
		}
	}
}
