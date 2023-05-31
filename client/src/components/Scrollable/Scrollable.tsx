import { useState, useRef, useEffect, WheelEvent, PropsWithChildren } from 'react';
import styles from './Scrollable.module.scss';

export const Scrollable = ({ children }: PropsWithChildren) => {
  const elContainer = useRef<HTMLDivElement>(null);
  const elContent = useRef<HTMLDivElement>(null);

  const [containerHeight, setContainerHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);

  const handlerScrolling = ({ deltaY }: WheelEvent) => {
    if (deltaY === 0) return;
    console.log(deltaY > 0 ? 'bottom' : 'top');
    console.log('[DELTA]:', deltaY);

    console.log('[CONTAINER H]:', );
    console.log('[CONTENT H]:', elContent.current?.clientHeight);
  };

  useEffect(() => {
    setContainerHeight(elContainer.current?.clientHeight ?? 0)
    setContentHeight(elContent.current?.clientHeight ?? 0)
  });

  return (
    <div className={styles.container} ref={elContainer} onWheel={handlerScrolling}>
      <div className={styles.scrollbar}>
        <div className={styles.thumb}></div>
      </div>

      <div className={styles.content} ref={elContent}>{children}</div>
    </div>
  );
};
