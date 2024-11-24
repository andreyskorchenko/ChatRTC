export const enum SocketEvents {
	ADD_PEER = 'ADD_PEER',
	CONNECT_TO_ROOM = 'CONNECT_TO_ROOM',
	CONNECT_TO_ROOM_ERROR = 'CONNECT_TO_ROOM_ERROR',
	CREATE_ROOM = 'CREATE_ROOM',
	CREATE_ROOM_ERROR = 'CREATE_ROOM_ERROR',
	CREATED_ROOM = 'CREATED_ROOM',
	DISCONNECT_OF_ROOM = 'DISCONNECT_OF_ROOM',
	GET_LIST_ROOMS = 'GET_LIST_ROOMS',
	REMOVE_PEER = 'REMOVE_PEER',
	SHARE_ICE_CANDIDATE = 'SHARE_ICE_CANDIDATE',
	SHARE_ICE_CANDIDATE_ERROR = 'SHARE_ICE_CANDIDATE_ERROR',
	SHARE_ROOMS = 'SHARE_ROOMS',
	SHARE_SDP_ANSWER = 'SHARE_SDP_ANSWER',
	SHARE_SDP_ANSWER_ERROR = 'SHARE_SDP_ANSWER_ERROR',
	SHARE_SDP_OFFER = 'SHARE_SDP_OFFER',
	SHARE_SDP_OFFER_ERROR = 'SHARE_SDP_OFFER_ERROR',
	SEND_MESSAGE = 'SEND_MESSAGE',
	SHARE_MESSAGES = 'SHARE_MESSAGES',
	GET_LIST_MESSAGES = 'GET_LIST_MESSAGES',
	SHARE_NEW_MESSAGE = 'SHARE_NEW_MESSAGE',
	ERROR = 'ERROR'
}
