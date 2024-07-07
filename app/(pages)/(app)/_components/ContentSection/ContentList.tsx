import { useRef, createRef, useEffect, useState } from 'react';
import styles from './ContentList.module.scss';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

interface ContentListProps {
  expanded: boolean;
  children: React.ReactNode[];
}

export default function ContentList({ expanded, children }: ContentListProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const contentBeltRef = useRef<HTMLDivElement>(null);
  const cardRefs = children.map((_) => createRef<HTMLDivElement>());
  const [progressWidth, setProgressWidth] = useState(0);
  const [progressShift, setProgressShift] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (viewportRef.current && contentBeltRef.current) {
        const { clientWidth: viewportWidth } = viewportRef.current;
        const { clientWidth: contentWidth } = contentBeltRef.current;

        setProgressWidth((viewportWidth / contentWidth) * 100);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
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
          {children.map((child: any, index: number) => (
            <div
              className={styles.card_wrapper}
              key={index}
              ref={cardRefs[index as any]}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
      <div className={`${styles.controls} ${expanded ? styles.hidden : null}`}>
        <button>
          <IoChevronBackOutline className={styles.icon} />
        </button>
        <div className={styles.progress_container}>
          <div className={styles.progress_indicator} style={progressStyles} />
        </div>
        <button>
          <IoChevronForwardOutline className={styles.icon} />
        </button>
      </div>
    </div>
  );
}
