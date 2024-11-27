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

export const iceServers: RTCIceServer[] = [{ urls: ['stun:stun.l.google.com:19302'] }];
