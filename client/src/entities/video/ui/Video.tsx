import { forwardRef } from 'react';
import { VideoProps } from './Video.props';
import { LOCAL_VIDEO_ELEMENT } from '../model';
import styles from './Video.module.scss';

export const Video = forwardRef<HTMLVideoElement | null, VideoProps>(({ peerId }, ref) => {
	const isMuted = peerId === LOCAL_VIDEO_ELEMENT;

	return (
		<div className={styles.video} data-peer-id={peerId}>
			<video autoPlay muted={isMuted} playsInline ref={ref} controls={false} />
		</div>
	);
});
