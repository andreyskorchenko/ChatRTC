import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionClassNames } from 'react-transition-group/CSSTransition';
import { Button, Overlay, Portal, Icon } from '@/shared/ui';
import { useMounted } from '@/shared/lib';
import { PopupProps } from './Popup.props';
import styles from './Popup.module.scss';

const transitionClassNames: CSSTransitionClassNames = {
	enter: styles['popup-enter'],
	enterActive: styles['popup-enter-active'],
	exit: styles['popup-exit'],
	exitActive: styles['popup-exit-active']
};

export const Popup = ({ opened, headerRender, className, closeHandle, children }: PopupProps) => {
	const popupStyles = cn(styles.popup, className);
	const popupRef = useRef<HTMLDivElement | null>(null);
	const [transitionIn, setTransitionIn] = useState(false);
	const [isMounted] = useMounted(opened, 150);

	useEffect(() => {
		const escapeHandle = ({ key }: KeyboardEvent) => {
			if (key !== 'Escape') return;
			closeHandle();
		};

		if (opened) {
			document.addEventListener('keyup', escapeHandle);
		} else {
			document.removeEventListener('keyup', escapeHandle);
		}

		return () => {
			document.removeEventListener('keyup', escapeHandle);
		};
	}, [opened, closeHandle]);

	return isMounted ? (
		<Portal>
			<Overlay opened={transitionIn} closeHandle={closeHandle} ref={() => setTransitionIn(opened)}>
				<CSSTransition
					in={transitionIn}
					nodeRef={popupRef}
					timeout={150}
					classNames={transitionClassNames}
					mountOnEnter
					unmountOnExit
				>
					<div ref={popupRef} className={popupStyles}>
						<div className={styles.popup__header}>
							{headerRender && headerRender()}
							<Button size="m" className={styles.popup__close} onClick={closeHandle}>
								<Icon name="close" size="24" className={styles.popup__icon} />
							</Button>
						</div>
						{children}
					</div>
				</CSSTransition>
			</Overlay>
		</Portal>
	) : null;
};
