import cn from 'classnames';
import { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionClassNames } from 'react-transition-group/CSSTransition';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Videos } from '@/widgets/videos/ui';
import { Chat } from '@/widgets/chat/ui';
import { useWebRTC } from '@/pages/room/lib';
import styles from './Room.module.scss';

const transitionClassNames: CSSTransitionClassNames = {
	enter: styles['room__chat-enter'],
	enterActive: styles['room__chat-enter-active'],
	exit: styles['room__chat-exit'],
	exitActive: styles['room__chat-exit-active']
};

export const Room = () => {
	const chatRef = useRef<HTMLDivElement | null>(null);
	const [isShowChat, setIsShowChat] = useState(false);
	const { roomId } = useParams();
	const { clients, setVideoElement } = useWebRTC(roomId);
	const navigate = useNavigate();

	return (
		<div className={cn(styles.room, { [styles.room_chat_true]: isShowChat })}>
			<Videos clients={clients} setVideoElement={setVideoElement} />
			<CSSTransition
				nodeRef={chatRef}
				in={isShowChat}
				classNames={transitionClassNames}
				timeout={250}
				mountOnEnter
				unmountOnExit
			>
				<div className={styles.room__chat} ref={chatRef}>
					<Chat roomId={roomId} />
				</div>
			</CSSTransition>

			<div className={styles.room__panel}>
				<Button type="danger" onClick={() => navigate('/')}>
					<Icon name="end_call" size="28" className={styles.room__call} />
				</Button>

				<Button
					className={cn(styles.room__messages, { [styles.room__messages_active]: isShowChat })}
					onClick={() => setIsShowChat((prev) => !prev)}
				>
					<Icon name="chat" size="24" />
				</Button>
			</div>
		</div>
	);
};
