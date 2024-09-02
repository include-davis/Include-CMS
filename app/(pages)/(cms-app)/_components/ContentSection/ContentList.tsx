import { useRef, useEffect, useState } from 'react';
import styles from './ContentList.module.scss';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

interface ContentListProps {
  expanded: boolean;
  children: React.ReactNode[];
}

export default function ContentList({ expanded, children }: ContentListProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const contentBeltRef = useRef<HTMLDivElement>(null);
  const [progressWidth, setProgressWidth] = useState(0);
  const [progressShift, setProgressShift] = useState(0);
  const [cardLocations, setCardLocations] = useState<number[]>([0]);

  useEffect(() => {
    const initProgressData = () => {
      if (viewportRef.current && contentBeltRef.current) {
        const { clientWidth: viewportWidth } = viewportRef.current;
        const { clientWidth: contentWidth } = contentBeltRef.current;

        setProgressWidth((viewportWidth / contentWidth) * 100);

        const cards = Array.from(
          contentBeltRef.current.children
        ) as HTMLLinkElement[];

        if (cards.every((card: Element) => card)) {
          const firstOffset = cards[0]?.offsetLeft || 0;
          setCardLocations(
            cards.map((card: any) => card.offsetLeft - firstOffset)
          );
        }
      }
    };

    window.addEventListener('resize', initProgressData);
    initProgressData();

    return () => {
      window.removeEventListener('resize', initProgressData);
    };
  }, [viewportRef, contentBeltRef]);

  const handleScroll = () => {
    if (viewportRef.current && contentBeltRef.current) {
      const { clientWidth: viewportWidth, scrollLeft: viewportScroll } =
        viewportRef.current;
      const { clientWidth: contentWidth } = contentBeltRef.current;

      const scrollableWidth = contentWidth - viewportWidth;

      setProgressShift(
        (viewportScroll / scrollableWidth) *
          100 *
          (1 - viewportWidth / contentWidth)
      );
    }
  };

  useEffect(() => {
    setProgressShift(0);
  }, [expanded]);

  const handleRightShift = () => {
    if (viewportRef.current && contentBeltRef.current) {
      const { clientWidth: viewportWidth, scrollLeft: viewportScroll } =
        viewportRef.current;

      const targetShift = viewportScroll + viewportWidth;
      const snapShift =
        cardLocations.findLast((cardLoc) => targetShift >= cardLoc) || 0;

      viewportRef.current.scrollTo({ left: snapShift, behavior: 'smooth' });
    }
  };

  const handleLeftShift = () => {
    if (viewportRef.current && contentBeltRef.current) {
      const { clientWidth: viewportWidth, scrollLeft: viewportScroll } =
        viewportRef.current;

      const targetShift = viewportScroll - viewportWidth;
      const snapShift =
        cardLocations.find((cardLoc) => targetShift <= cardLoc) || 0;

      viewportRef.current.scrollTo({ left: snapShift, behavior: 'smooth' });
    }
  };

  const progressStyles = {
    width: `${progressWidth}%`,
    left: `${progressShift}%`,
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.viewport}
        ref={viewportRef}
        onScroll={handleScroll}
      >
        <div
          className={`${styles.cards} ${expanded ? styles.expanded : null}`}
          ref={contentBeltRef}
        >
          {children}
        </div>
      </div>
      {(viewportRef.current?.clientWidth ?? 0) <
        (contentBeltRef.current?.clientWidth ?? 0) && (
        <div
          className={`${styles.controls} ${expanded ? styles.hidden : null}`}
        >
          <button onClick={handleLeftShift}>
            <IoChevronBackOutline className={styles.icon} />
          </button>
          <div className={styles.progress_container}>
            <div className={styles.progress_indicator} style={progressStyles} />
          </div>
          <button onClick={handleRightShift}>
            <IoChevronForwardOutline className={styles.icon} />
          </button>
        </div>
      )}
    </div>
  );
}
