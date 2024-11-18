import { useState, useRef, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LOCAL_VIDEO_ELEMENT } from '@/entities/video/model';
import { Video } from '@/entities/video/ui';

import {
	AddPeerPayload,
	RemovePeerPayload,
	ShareIceCandidatePayload,
	ShareSdpAnswerPayload,
	ShareSdpOfferPayload,
	SocketEvents,
	iceServers
} from '@/shared/model';

import { useSocketContext, useAbortController } from '@/shared/lib';
import styles from './Room.module.scss';

export const Room = () => {
	const { roomId } = useParams();
	const navigate = useNavigate();
	const socket = useSocketContext();
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
		if (!socket) return;
		const localVideoElement = videoElements.current.get(LOCAL_VIDEO_ELEMENT);

		if (localVideoElement && !localVideoElement.srcObject) {
			const setLocalMediaStream = async () => {
				try {
					localMediaStream.current = await navigator.mediaDevices.getUserMedia({
						audio: true,
						video: true
					});

					localVideoElement.srcObject = localMediaStream.current;
					socket.emit(SocketEvents.CONNECT_TO_ROOM, { roomId });
				} catch (err) {
					console.error('Unable to access camera and/or microphone', err);
				}
			};

			setLocalMediaStream();
		}
	}, []);

	useEffect(() => {
		if (!socket) return;

		socket.on(SocketEvents.CONNECT_TO_ROOM_ERROR, () => {
			navigate('/', { replace: true });
		});

		socket.on(SocketEvents.ADD_PEER, async ({ peerId, isOfferCreate }: AddPeerPayload) => {
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
						socket.emit(SocketEvents.SHARE_ICE_CANDIDATE, {
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

					socket.emit(SocketEvents.SHARE_SDP_OFFER, {
						roomId,
						peerId,
						offer
					});
				} catch (err) {
					console.error('Failed to create offer:', err);
				}
			}
		});

		socket.on(SocketEvents.SHARE_SDP_OFFER, async ({ peerId, offer }: ShareSdpOfferPayload) => {
			const peer = peerConnections.current.get(peerId);
			if (!peer) return;

			try {
				await peer.setRemoteDescription(offer);
				const answer = await peer.createAnswer();
				await peer.setLocalDescription(new RTCSessionDescription(answer));

				socket.emit(SocketEvents.SHARE_SDP_ANSWER, {
					roomId,
					peerId,
					answer
				});
			} catch (err) {
				console.error('Error at installing offer or creating answer:', err);
			}
		});

		socket.on(SocketEvents.SHARE_SDP_ANSWER, async ({ peerId, answer }: ShareSdpAnswerPayload) => {
			const peer = peerConnections.current.get(peerId);
			if (!peer) return;

			try {
				await peer.setRemoteDescription(new RTCSessionDescription(answer));
			} catch (err) {
				console.error('Error at installing answer:', err);
			}
		});

		socket.on(SocketEvents.SHARE_ICE_CANDIDATE, async ({ peerId, candidate }: ShareIceCandidatePayload) => {
			const peer = peerConnections.current.get(peerId);
			if (!peer) return;

			try {
				await peer.addIceCandidate(new RTCIceCandidate(candidate));
			} catch (err) {
				console.error('Error adding ICE candidate:', err);
			}
		});

		socket.on(SocketEvents.REMOVE_PEER, ({ peerId }: RemovePeerPayload) => {
			const peer = peerConnections.current.get(peerId);
			if (!peer) return;

			peer.close();
			peerConnections.current.delete(peerId);
			videoElements.current.delete(peerId);
			setClients((prev) => prev.filter((clientPeerId) => clientPeerId !== peerId));
		});
	}, [roomId, socket]);

	useEffect(() => {
		return () => {
			peerConnections.current.forEach((peer) => {
				peer.close();
			});

			localMediaStream.current?.getTracks().forEach((track) => {
				track.stop();
			});

			socket?.emit(SocketEvents.DISCONNECT_OF_ROOM, { roomId });
			socket?.off(SocketEvents.CONNECT_TO_ROOM_ERROR);
			socket?.off(SocketEvents.ADD_PEER);
			socket?.off(SocketEvents.REMOVE_PEER);
			socket?.off(SocketEvents.SHARE_SDP_OFFER);
			socket?.off(SocketEvents.SHARE_SDP_ANSWER);
			socket?.off(SocketEvents.SHARE_ICE_CANDIDATE);
		};
	}, []);

	return (
		<div className={styles.room}>
			{clients.map((peerId) => (
				<Video peerId={peerId} key={peerId} ref={(element) => setVideoElement(peerId, element)} />
			))}
		</div>
	);
};
