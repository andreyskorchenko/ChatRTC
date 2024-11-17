import { Catch, BadRequestException, ArgumentsHost } from '@nestjs/common';
import { BaseWsExceptionFilter } from '@nestjs/websockets';
import { SocketEvents } from '@/socket/types';
import { Socket } from 'socket.io';

@Catch()
export class WsExceptionsFilter extends BaseWsExceptionFilter {
	catch(exception: BadRequestException, host: ArgumentsHost) {
		const response = exception.getResponse();
		const ws = host.switchToWs();
		const client = ws.getClient<Socket>();

		if (
			typeof response === 'object' &&
			typeof response !== 'string' &&
			typeof response !== null &&
			'message' in response &&
			Array.isArray(response.message)
		) {
			client.emit(SocketEvents.ERROR, { message: response.message });
		} else {
			client.emit(SocketEvents.ERROR, { message: ['Bad request'] });
		}
	}
}
