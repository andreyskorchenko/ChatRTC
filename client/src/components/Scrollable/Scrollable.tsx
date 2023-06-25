import cn from 'classnames';
import { useState, useMemo, useRef, useEffect, WheelEvent, MouseEvent, PropsWithChildren } from 'react';
import styles from './Scrollable.module.scss';

export const Scrollable = ({ children }: PropsWithChildren) => {
  const scrollableRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const [containerHeight, setContainerHeight] = useState(1);
  const [contentHeight, setContentHeight] = useState(1);
  const [scrollbarHeight, setScrollbarHeight] = useState(0);

  const [scrollPosition, setScrollPosition] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const isScrollbar = useMemo(() => contentHeight > containerHeight, [contentHeight, containerHeight]);
  const scrollableHeight = useMemo(() => Math.floor(contentHeight - containerHeight), [contentHeight, containerHeight]);

  const thumbHeight = useMemo(() => {
    const height = Math.ceil((containerHeight / 100) * ((100 / contentHeight) * scrollbarHeight));
    return height <= 16 ? 16 : height;
  }, [containerHeight, contentHeight, scrollbarHeight]);

  const thumbTop = useMemo(() => {
    const percent = Math.floor((100 / (scrollableHeight || 1)) * Math.abs(scrollPosition));
    return ((scrollbarHeight - thumbHeight) / 100) * percent;
  }, [thumbHeight, scrollPosition]);

  const handlerScrolling = ({ deltaY }: WheelEvent) => {
    if (deltaY === 0) return;

    // console.log('[CONTAINER]:', scrollableRef.current?.clientHeight);
    // console.log('[CONTENT]:', contentRef.current?.clientHeight);
    // console.log('[SCROLLBAR]:', scrollbarRef.current?.clientHeight);
    // console.log('[THUMB]:', thumbRef.current?.clientHeight);

    setScrollPosition((prev) => {
      const position = deltaY > 0 ? prev - 25 : prev + 25;
      return position >= 0 ? 0 : Math.abs(position) >= scrollableHeight ? scrollableHeight * -1 : position;
    });
  };

  useEffect(() => {
    setContainerHeight(scrollableRef.current?.clientHeight || 1);
    setContentHeight(contentRef.current?.clientHeight || 1);
    setScrollbarHeight(scrollbarRef.current?.clientHeight || 0);

    if (!contentRef.current) return;
    const observer = new ResizeObserver(([{ contentRect: { height } }]) => {
      setContentHeight(height);
    });

    observer.observe(contentRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (Math.abs(scrollPosition) > scrollableHeight) {
      setScrollPosition(scrollableHeight * -1);
    }
  }, [scrollableHeight]);
  
  const draggingThumb = ({ clientY }: MouseEvent<HTMLDivElement>) => {
    if (!isMouseDown) return;
    const percent = (100 / containerHeight) * clientY;
    setScrollPosition(Math.ceil(scrollableHeight / 100 * (percent < 0 ? 0 : percent)) * -1);
  };

  const canceledSelectionAndDraggable = (e: Event) => {
    if (isMouseDown) {
      e.preventDefault();
    }
  }

  useEffect(() => {
    document.addEventListener('selectstart', canceledSelectionAndDraggable);
    document.addEventListener('dragstart', canceledSelectionAndDraggable);

    return () => {
      document.removeEventListener('selectstart', canceledSelectionAndDraggable);
      document.removeEventListener('dragstart', canceledSelectionAndDraggable);
    };
  }, [isMouseDown])

  return (
    <div
      ref={scrollableRef}
      className={styles.scrollable}
      onWheel={handlerScrolling}
      onMouseMove={draggingThumb}
      onMouseUp={() => setIsMouseDown(false)}
      onMouseLeave={() => setIsMouseDown(false)}
    >
      <div
        className={cn(styles.scrollable__content, { [styles.scrollable__content_scrollbar]: isScrollbar })}
        ref={contentRef}
        style={{ top: `${scrollPosition}px` }}
      >
        {children}
      </div>

      <div
        className={cn(styles.scrollable__scrollbar, { [styles.scrollable__scrollbar_hide]: !isScrollbar })}
        ref={scrollbarRef}
      >
        <div
          ref={thumbRef}
          className={styles.scrollable__thumb}
          style={{ height: thumbHeight, top: thumbTop }}
          onMouseDown={() => setIsMouseDown(true)}
        ></div>
      </div>
    </div>
  );
};
