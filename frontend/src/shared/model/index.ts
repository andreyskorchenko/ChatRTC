export type { ComponentSizes, ComponentTypes } from './components';
export { SocketEvents } from './socket-events';

export type AddPeerPayload = {
	peerId: string;
	isOfferCreate: boolean;
};

export type RemovePeerPayload = {
	peerId: string;
};

export type ShareSdpOfferPayload = {
	peerId: string;
	offer: RTCSessionDescription;
};

export type ShareSdpAnswerPayload = {
	peerId: string;
	answer: RTCSessionDescription;
};

export type ShareIceCandidatePayload = {
	peerId: string;
	candidate: RTCIceCandidate;
};

export type ClientData = {
	rtc: RTCPeerConnection | null;
	stream: MediaStream | null;
	videoElement: HTMLVideoElement | null;
};

export type VideoClient = {
	peerId: string;
} & ClientData;

export const LOCAL = 'LOCAL';

export const iceServers: RTCIceServer[] = [
	{
		urls: [
			'stun:stun.l.google.com:19302'
			// 'stun:stun1.l.google.com:19302',
			// 'stun:stun2.l.google.com:19302',
			// 'stun:stun3.l.google.com:19302',
			// 'stun:stun4.l.google.com:19302'
			// 'stun:stun.ekiga.net',
			// 'stun:stun.stunprotocol.org:3478',
			// 'stun:stun.voipbuster.com',
			// 'stun:stun.voipstunt.com'
		]
	}
];
