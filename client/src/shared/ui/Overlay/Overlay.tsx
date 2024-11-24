import { forwardRef, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionClassNames } from 'react-transition-group/CSSTransition';
import { OverlayProps } from './Overlay.props';
import styles from './Overlay.module.scss';

const transitionClassNames: CSSTransitionClassNames = {
	enter: styles['container__overlay-enter'],
	enterActive: styles['container__overlay-enter-active'],
	exit: styles['container__overlay-exit'],
	exitActive: styles['container__overlay-exit-active']
};

export const Overlay = forwardRef<HTMLDivElement | null, OverlayProps>(({ opened, closeHandle, children }, ref) => {
	const overlayRef = useRef<HTMLDivElement | null>(null);

	return (
		<div className={styles.container} ref={ref}>
			<CSSTransition
				in={opened}
				nodeRef={overlayRef}
				timeout={150}
				classNames={transitionClassNames}
				mountOnEnter
				unmountOnExit
			>
				<div ref={overlayRef} className={styles.container__overlay} onClick={closeHandle} />
			</CSSTransition>
			{children}
		</div>
	);
});
