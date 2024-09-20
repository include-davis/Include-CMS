import { useContext, useState, useEffect, useRef } from 'react';
import { ContentWindowContext } from '@contexts/ContentWindowContext';

export default function useContentWindowContext() {
  const { contentWindowRef } = useContext(ContentWindowContext);

  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [bottom, setBottom] = useState(0);
  const [right, setRight] = useState(0);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const setPosition = (e: Element) => {
    const { top, left, bottom, right } = e.getBoundingClientRect();
    setTop(top);
    setLeft(left);
    setBottom(bottom);
    setRight(right);
  };

  useEffect(() => {
    if (!contentWindowRef.current) return;
    resizeObserverRef.current = new ResizeObserver((entries) => {
      if (!Array.isArray(entries) || entries.length === 0) {
        return;
      }
      const entry = entries[0];
      setPosition(entry.target);
    });

    const elem = contentWindowRef.current;

    resizeObserverRef.current.observe(elem);

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.unobserve(elem);
      }
    };
  }, [contentWindowRef]);

  return { top, left, bottom, right };
}
