import { useRef, useState, useMemo, useEffect, WheelEvent, MouseEvent, PropsWithChildren } from 'react';
import cn from 'classnames';
import styles from './Scrollable.module.scss';

export const Scrollable = ({ children }: PropsWithChildren) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [containerHeight, setContainerHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [scrollbarHeight, setScrollbarHeight] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  const scrollableHeight = useMemo(() => {
    const height = contentHeight - containerHeight;
    return height <= 0 ? 0 : Math.floor(height);
  }, [contentHeight]);

  const isScrollbar = useMemo(() => scrollableHeight > 0, [scrollableHeight]);

  const thumbHeight = useMemo(() => {
    const height = (100 / (contentHeight || 1)) * containerHeight * (scrollbarHeight / 100);
    return height <= 16 ? 16 : height;
  }, [contentHeight]);

  const thumbTop = useMemo(() => {
    const percentScrolling = (100 / (scrollableHeight || 1)) * Math.abs(scrollPosition);
    const top = Math.ceil(((scrollbarHeight - thumbHeight) / 100) * percentScrolling);
    return top <= 0 ? 0 : top;
  }, [scrollableHeight, scrollPosition]);

  const handlerScrolling = ({ deltaY }: WheelEvent) => {
    if (deltaY === 0) return;
    setScrollPosition((prev) => {
      const position = prev + deltaY * -1;
      return position >= 0 ? 0 : Math.min(Math.abs(position), scrollableHeight) * -1;
    });
  };

  const draggingThumb = ({ clientY }: MouseEvent<HTMLDivElement>) => {
    if (!isMouseDown) return;
    const position = Math.ceil((100 / (containerHeight || 1)) * clientY * (scrollableHeight / 100));
    setScrollPosition(position <= 0 ? 0 : Math.min(position, scrollableHeight) * -1);
  };

  const canceledSelectionAndDraggable = (e: Event) => {
    if (isMouseDown) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    setContainerHeight(containerRef.current?.clientHeight || 0);
    setContentHeight(contentRef.current?.clientHeight || 0);
    setScrollbarHeight(scrollbarRef.current?.clientHeight || 0);

    if (!contentRef.current) return;
    const observer = new ResizeObserver(
      ([
        {
          contentRect: { height },
        },
      ]) => {
        setContentHeight(height);
      }
    );

    observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (Math.abs(scrollPosition) > scrollableHeight) {
      setScrollPosition(scrollableHeight * -1);
    }
  }, [scrollableHeight]);

  useEffect(() => {
    document.addEventListener('selectstart', canceledSelectionAndDraggable);
    document.addEventListener('dragstart', canceledSelectionAndDraggable);

    return () => {
      document.removeEventListener('selectstart', canceledSelectionAndDraggable);
      document.removeEventListener('dragstart', canceledSelectionAndDraggable);
    };
  }, [isMouseDown]);

  return (
    <div
      ref={containerRef}
      className={styles.container}
      onWheel={handlerScrolling}
      onMouseMove={draggingThumb}
      onMouseUp={() => setIsMouseDown(false)}
      onMouseLeave={() => setIsMouseDown(false)}
    >
      <div
        ref={contentRef}
        className={cn(styles.content, { [styles.content_scrollbar]: isScrollbar })}
        style={{ top: `${scrollPosition}px` }}
      >
        {children}
      </div>

      <div ref={scrollbarRef} className={cn(styles.scrollbar, { [styles.scrollbar_hide]: !isScrollbar })}>
        <div
          ref={thumbRef}
          className={styles.scrollbar__thumb}
          style={{ height: thumbHeight, top: thumbTop }}
          onMouseDown={() => setIsMouseDown(true)}
        />
      </div>
    </div>
  );
};
