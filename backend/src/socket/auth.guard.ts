import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class AuthGuard implements CanActivate {
	async canActivate(context: ExecutionContext) {
		try {
			const ws = context.switchToWs();
			const client = ws.getClient<Socket>();
			return Boolean(client.handshake.auth.username?.trim().length);
		} catch {
			return false;
		}
	}
}
