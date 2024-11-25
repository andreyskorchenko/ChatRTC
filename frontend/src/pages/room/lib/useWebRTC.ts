import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOCAL_VIDEO_ELEMENT } from '@/entities/video/model';
import { useSocketContext, useAbortController } from '@/shared/lib';

import {
	AddPeerPayload,
	ShareSdpOfferPayload,
	ShareSdpAnswerPayload,
	ShareIceCandidatePayload,
	RemovePeerPayload,
	iceServers
} from '@/shared/model';

export const useWebRTC = (roomId?: string) => {
	const navigate = useNavigate();
	const { pub, sub, unSub } = useSocketContext();
	const { abortController } = useAbortController();

	const [clients, setClients] = useState<string[]>([LOCAL_VIDEO_ELEMENT]);
	const peerConnections = useRef<Map<string, RTCPeerConnection>>(new Map());
	const videoElements = useRef<Map<string, HTMLVideoElement | null>>(new Map([[LOCAL_VIDEO_ELEMENT, null]]));
	const localMediaStream = useRef<MediaStream | null>(null);

	const setVideoElement = useCallback((peerId: string, element: HTMLVideoElement | null) => {
		if (element && !videoElements.current.get(peerId)) {
			videoElements.current.set(peerId, element);
		}
	}, []);

	useEffect(() => {
		const localVideoElement = videoElements.current.get(LOCAL_VIDEO_ELEMENT);

		if (localVideoElement && !localVideoElement.srcObject) {
			const setLocalMediaStream = async () => {
				try {
					localMediaStream.current = await navigator.mediaDevices.getUserMedia({
						audio: true,
						video: {
							width: {
								min: 480,
								max: 960
							},
							height: {
								min: 240,
								max: 480
							},
							frameRate: {
								min: 10,
								max: 60
							}
						}
					});

					localVideoElement.srcObject = localMediaStream.current;
					pub('CONNECT_TO_ROOM', { roomId });
				} catch (err) {
					console.error('Unable to access camera and/or microphone', err);
				}
			};

			setLocalMediaStream();
		}
	}, [roomId]);

	useEffect(() => {
		sub('CONNECT_TO_ROOM_ERROR', () => {
			navigate('/', { replace: true });
		});

		sub<AddPeerPayload>('ADD_PEER', async ({ peerId, isOfferCreate }) => {
			if (clients.includes(peerId)) return;
			setClients((prev) => [...prev, peerId]);

			const peer = new RTCPeerConnection({ iceServers });
			peerConnections.current.set(peerId, peer);

			if (localMediaStream.current) {
				for (const track of localMediaStream.current.getTracks()) {
					peer.addTrack(track, localMediaStream.current);
				}
			}

			peer.addEventListener(
				'track',
				({ streams }) => {
					const remoteVideoElement = videoElements.current.get(peerId);
					if (remoteVideoElement) {
						remoteVideoElement.srcObject = new MediaStream(streams[0].getTracks());
					}
				},
				{ signal: abortController.signal }
			);

			peer.addEventListener(
				'icecandidate',
				({ candidate }) => {
					if (candidate && peer.remoteDescription) {
						pub('SHARE_ICE_CANDIDATE', {
							roomId,
							peerId,
							candidate
						});
					}
				},
				{ signal: abortController.signal }
			);

			if (isOfferCreate) {
				try {
					const offer = await peer.createOffer();
					await peer.setLocalDescription(new RTCSessionDescription(offer));

					pub('SHARE_SDP_OFFER', {
						roomId,
						peerId,
						offer
					});
				} catch (err) {
					console.error('Failed to create offer:', err);
				}
			}
		});

		sub<ShareSdpOfferPayload>('SHARE_SDP_OFFER', async ({ peerId, offer }) => {
			const peer = peerConnections.current.get(peerId);
			if (!peer) return;

			try {
				await peer.setRemoteDescription(offer);
				const answer = await peer.createAnswer();
				await peer.setLocalDescription(new RTCSessionDescription(answer));

				pub('SHARE_SDP_ANSWER', {
					roomId,
					peerId,
					answer
				});
			} catch (err) {
				console.error('Error at installing offer or creating answer:', err);
			}
		});

		sub<ShareSdpAnswerPayload>('SHARE_SDP_ANSWER', async ({ peerId, answer }) => {
			const peer = peerConnections.current.get(peerId);
			if (!peer) return;

			try {
				await peer.setRemoteDescription(new RTCSessionDescription(answer));
			} catch (err) {
				console.error('Error at installing answer:', err);
			}
		});

		sub<ShareIceCandidatePayload>('SHARE_ICE_CANDIDATE', async ({ peerId, candidate }) => {
			const peer = peerConnections.current.get(peerId);
			if (!peer) return;

			try {
				await peer.addIceCandidate(new RTCIceCandidate(candidate));
			} catch (err) {
				console.error('Error adding ICE candidate:', err);
			}
		});

		sub<RemovePeerPayload>('REMOVE_PEER', ({ peerId }) => {
			const peer = peerConnections.current.get(peerId);
			if (!peer) return;

			peer.close();
			peerConnections.current.delete(peerId);
			videoElements.current.delete(peerId);
			setClients((prev) => prev.filter((clientPeerId) => clientPeerId !== peerId));
		});

		return () => {
			peerConnections.current.forEach((peer) => {
				peer.close();
			});

			localMediaStream.current?.getTracks().forEach((track) => {
				track.stop();
			});

			pub('DISCONNECT_OF_ROOM', { roomId });
			unSub('CONNECT_TO_ROOM_ERROR');
			unSub('ADD_PEER');
			unSub('REMOVE_PEER');
			unSub('SHARE_SDP_OFFER');
			unSub('SHARE_SDP_ANSWER');
			unSub('SHARE_ICE_CANDIDATE');
		};
	}, [roomId]);

	return { clients, setVideoElement };
};
