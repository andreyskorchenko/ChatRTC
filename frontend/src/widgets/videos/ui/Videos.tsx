import { Video } from '@/entities/video/ui';
import { VideosProps } from './Videos.props';
import styles from './Videos.module.scss';

export const Videos = ({ clients, setVideoElement }: VideosProps) => {
	return (
		<div className={styles.videos}>
			{clients.map((peerId) => (
				<Video peerId={peerId} key={peerId} ref={(element) => setVideoElement(peerId, element)} />
			))}
		</div>
	);
};
