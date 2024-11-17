import { randomUUID } from 'node:crypto';
// 🤔 Maybe ws? https://www.npmjs.com/package/ws 🤔
import { Server, Socket } from 'socket.io';
import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';

import {
	WebSocketGateway,
	WebSocketServer,
	OnGatewayDisconnect,
	SubscribeMessage,
	ConnectedSocket,
	MessageBody
} from '@nestjs/websockets';

import { SocketEvents, Room, ResponseShareRoom } from '@/socket/types';
import { WsExceptionsFilter } from '@/socket/filters';

import {
	CreateRoomDto,
	ConnectToRoomDto,
	DisconnectOfRoomDto,
	ShareSdpOffer,
	ShareSdpAnswer,
	ShareIceCandidate
} from '@/socket/dto';

@WebSocketGateway({
	cors: {
		origin: '*'
	}
})
export class SocketGateway implements OnGatewayDisconnect {
	@WebSocketServer() private io: Server;
	private rooms: Map<string, Room> = new Map();

	handleDisconnect(client: Socket) {
		this.rooms.forEach((room) => {
			if (room.clients.has(client.id)) {
				room.clients.delete(client.id);
				room.clients.forEach((roomClient) => {
					roomClient.emit(SocketEvents.REMOVE_PEER, {
						peerId: client.id
					});
				});
			}
		});

		this.shareRooms();
	}

	@SubscribeMessage(SocketEvents.GET_LIST_ROOMS)
	getListRoom(@ConnectedSocket() client: Socket) {
		client.emit(SocketEvents.SHARE_ROOMS, this.getShareRooms());
	}

	@UseFilters(new WsExceptionsFilter())
	@UsePipes(new ValidationPipe())
	@SubscribeMessage(SocketEvents.CREATE_ROOM)
	createRoom(@ConnectedSocket() client: Socket, @MessageBody() { name }: CreateRoomDto) {
		if (!this.isExistsRoomName(name)) {
			const roomId = randomUUID();

			this.rooms.set(roomId, {
				name: name,
				clients: new Map(),
				timestamp: new Date().toString()
			});

			client.emit(SocketEvents.CREATED_ROOM);
			this.shareRooms();
		} else {
			client.emit(SocketEvents.CREATE_ROOM_ERROR, {
				message: ['A room with this name already exists']
			});
		}
	}

	@UseFilters(new WsExceptionsFilter())
	@UsePipes(new ValidationPipe())
	@SubscribeMessage(SocketEvents.CONNECT_TO_ROOM)
	connectToRoom(@ConnectedSocket() client: Socket, @MessageBody() { roomId }: ConnectToRoomDto) {
		const room = this.rooms.get(roomId);

		if (room && !room.clients.has(client.id)) {
			room.clients.set(client.id, client);
			this.shareRooms();

			room.clients.forEach((roomClient) => {
				if (roomClient.id !== client.id) {
					roomClient.emit(SocketEvents.ADD_PEER, {
						peerId: client.id,
						isOfferCreate: false
					});

					client.emit(SocketEvents.ADD_PEER, {
						peerId: roomClient.id,
						isOfferCreate: true
					});
				}
			});
		} else {
			client.emit(SocketEvents.CONNECT_TO_ROOM_ERROR);
		}
	}

	@SubscribeMessage(SocketEvents.SHARE_SDP_OFFER)
	shareSdpOffer(@ConnectedSocket() client: Socket, @MessageBody() { roomId, peerId, offer }: ShareSdpOffer) {
		const room = this.rooms.get(roomId);

		if (room) {
			const roomClient = room.clients.get(peerId);

			if (roomClient) {
				return roomClient.emit(SocketEvents.SHARE_SDP_OFFER, {
					peerId: client.id,
					offer
				});
			}
		}

		client.emit(SocketEvents.SHARE_SDP_OFFER_ERROR);
	}

	@SubscribeMessage(SocketEvents.SHARE_SDP_ANSWER)
	shareSdpAnswer(@ConnectedSocket() client: Socket, @MessageBody() { roomId, peerId, answer }: ShareSdpAnswer) {
		const room = this.rooms.get(roomId);

		if (room) {
			const roomClient = room.clients.get(peerId);

			if (roomClient) {
				return roomClient.emit(SocketEvents.SHARE_SDP_ANSWER, {
					peerId: client.id,
					answer
				});
			}
		}

		client.emit(SocketEvents.SHARE_SDP_ANSWER_ERROR);
	}

	@SubscribeMessage(SocketEvents.SHARE_ICE_CANDIDATE)
	shareIceCandidate(
		@ConnectedSocket() client: Socket,
		@MessageBody() { roomId, peerId, candidate }: ShareIceCandidate
	) {
		const room = this.rooms.get(roomId);

		if (room) {
			const roomClient = room.clients.get(peerId);

			if (roomClient) {
				return roomClient.emit(SocketEvents.SHARE_ICE_CANDIDATE, {
					peerId: client.id,
					candidate
				});
			}
		}

		client.emit(SocketEvents.SHARE_ICE_CANDIDATE_ERROR);
	}

	@UseFilters(new WsExceptionsFilter())
	@UsePipes(new ValidationPipe())
	@SubscribeMessage(SocketEvents.DISCONNECT_OF_ROOM)
	disconnectOfRoom(@ConnectedSocket() client: Socket, @MessageBody() { roomId }: DisconnectOfRoomDto) {
		const room = this.rooms.get(roomId);

		if (room && room.clients.has(client.id)) {
			room.clients.delete(client.id);
			room.clients.forEach((roomClient) => {
				roomClient.emit(SocketEvents.REMOVE_PEER, {
					peerId: client.id
				});
			});

			this.shareRooms();
		}
	}

	private shareRooms() {
		this.io.sockets.sockets.forEach((client) => {
			client.emit(SocketEvents.SHARE_ROOMS, this.getShareRooms());
		});
	}

	private getShareRooms() {
		const rooms: ResponseShareRoom[] = [];
		this.rooms.forEach((room, key) => {
			rooms.push({
				id: key,
				name: room.name,
				online: room.clients.size,
				timestamp: room.timestamp
			});
		});

		return rooms;
	}

	private isExistsRoomName(name: string) {
		let isExists = false;
		for (const room of this.rooms.values()) {
			if (room.name === name) {
				isExists = true;
				break;
			}
		}

		return isExists;
	}
}