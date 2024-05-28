// 'use client';
// import formConfig from '../../../../editor.config';
// import styles from './Collection.module.scss';
// interface CollectionPageProps {
//   params: {
//     collection?: string;
//   };
// }

// const CollectionPage: React.FC<CollectionPageProps> = ({ params }) => {
//   const { collection } = params;
//   const currentSection = formConfig.sections.find(
//     (section) =>
//       section.name.toLowerCase() === collection?.toString().toLowerCase()
//   );
//   if (!currentSection) {
//     return <div>Invalid collection</div>;
//   }
//   return (
//     <main className={styles.main}>
//       <h1>{currentSection.name}</h1>
//     </main>
//   );
// };

// export default CollectionPage;
'use client';
import { useState, useRef, useEffect } from 'react';
import CollectionCard from './CollectionCard/CollectionCard';
import SortMenu from '@components/SortMenu/SortMenu';
import SelectButton from '@components/SelectButton';
import CreateNew from './edit/_components/CreateNew/CreateNew';
import styles from './homepage.module.scss';

export default function Home() {
  const [extended, setExtended] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollAmount = 200;
  const collections = [
    {
      name: 'Wedding name 1',
      images: [
        '/index/city.jpg',
        '/index/city.jpg',
        '/index/city.jpg',
        '/index/city.jpg',
      ],
    },
    {
      name: 'Wedding name 2',
      images: ['/index/city.jpg', '/index/city.jpg'],
    },
    {
      name: 'Wedding name 3',
      images: ['/index/city.jpg', '/index/city.jpg'],
    },
    {
      name: 'Wedding name 4',
      images: ['/index/city.jpg', '/index/city.jpg'],
    },
    {
      name: 'Wedding name 5',
      images: [
        '/index/city.jpg',
        '/index/city.jpg',
        '/index/city.jpg',
        '/index/city.jpg',
        '/index/city.jpg',
      ],
    },
  ];

  const handleExtendClick = () => {
    console.log('Extend clicked');
    setExtended((prevExtended) => !prevExtended); // Toggle extended state
  };

  const updateScrollProgress = () => {
    if (containerRef.current) {
      const maxScroll =
        containerRef.current.scrollWidth - containerRef.current.clientWidth;
      const progress = (scrollPosition / maxScroll) * 100;
      setScrollProgress(progress);
    }
  };

  useEffect(() => {
    updateScrollProgress();
  }, [scrollPosition]);

  const handleScrollLeft = () => {
    if (containerRef.current) {
      const newPosition = Math.max(scrollPosition - scrollAmount, 0);
      setScrollPosition(newPosition);
      containerRef.current.scrollTo({ left: newPosition, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (containerRef.current) {
      const maxScroll =
        containerRef.current.scrollWidth - containerRef.current.clientWidth;
      const newPosition = Math.min(scrollPosition + scrollAmount, maxScroll);
      setScrollPosition(newPosition);
      containerRef.current.scrollTo({ left: newPosition, behavior: 'smooth' });
    }
  };

  return (
    <main>
      <div className={styles.titleheading}>
        <h1>Weddings</h1>
        <div className={styles.newcontentcontainer}>
          <SelectButton />
          <CreateNew />
        </div>
      </div>
      <div className={styles.container}>
        <SortMenu updater={() => {}} sortBy="placeholder" />
      </div>
      <div className={styles.pageheading}>
        <span>
          Published{' '}
          <span style={{ fontSize: '16px' }}>
            ({extended ? collections.length + 10 : collections.length} items)
          </span>
        </span>
        <div>
          <span style={{ fontSize: '16px', color: '#888888' }}>
            {extended ? 'Collapse' : 'Expand to see all'}
          </span>
          <button onClick={handleExtendClick} className={styles.buttonexpand}>
            {extended ? '<' : '>'}
          </button>
        </div>
      </div>
      <div>
        {extended ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '20px',
              margin: '20px',
            }}
          >
            {collections.map((collection, index) => (
              <div key={index} style={{ marginTop: '20px' }}>
                <CollectionCard
                  name={collection.name}
                  images={collection.images}
                />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div ref={containerRef} className={styles.transition}>
              {collections.map((collection, index) => (
                <div
                  key={index}
                  style={{ marginRight: '20px', marginTop: '20px' }}
                >
                  <CollectionCard
                    name={collection.name}
                    images={collection.images}
                  />
                </div>
              ))}
            </div>
            <div className={styles.scroll}>
              <button
                onClick={handleScrollLeft}
                className={styles.buttonscroll}
              >
                {'<'}
              </button>
              <div className={styles.progressbar}>
                <div
                  style={{
                    width: '20px',
                    height: '10px',
                    backgroundColor: '#441983',
                    position: 'absolute',
                    top: '0',
                    left: `${scrollProgress}%`,
                    transform: 'translateX(-50%)',
                    borderRadius: '2px',
                  }}
                ></div>
              </div>
              <button
                onClick={handleScrollRight}
                className={styles.buttonscroll}
              >
                {'>'}
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
