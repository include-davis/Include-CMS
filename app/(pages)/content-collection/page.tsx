// import CollectionCard from "./_component/CollectionCard/CollectionCard";
// import MediaCardPlaceholder from "./_component/CollectionCard/MediaCard";
// import PreviwCardPlaceholder from "./_component/CollectionCard/PreviewCard";
// export default function Home() {
//   return (
//     <main>
//       <h1>Wedding</h1>
//       <CollectionCard />
//       <MediaCardPlaceholder />
//       <PreviwCardPlaceholder />
//     </main>
//   );
// }
'use client';
import { useState, useRef, useEffect } from 'react';
import CollectionCard from './_component/CollectionCard/CollectionCard';
import SortMenu from '@components/SortMenu/SortMenu';
import SelectButton from '@components/SelectButton';
import CreateNew from '../content/[collection]/edit/_components/CreateNew/CreateNew';

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
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          paddingLeft: '.2%',
        }}
      >
        <h1>Weddings</h1>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '10px',
            paddingLeft: '60%',
            paddingTop: '.5%',
          }}
        >
          <SelectButton />
          <CreateNew />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingTop: '.5%',
          paddingLeft: '60%',
          paddingRight: '10x',
        }}
      >
        <SortMenu updater={() => {}} sortBy="placeholder" />
      </div>
      <div
        style={{
          marginTop: '20px',
          fontSize: '24px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingRight: '20px',
          paddingLeft: '20px',
          width: '100%',
        }}
      >
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
          <button
            onClick={handleExtendClick}
            style={{
              marginLeft: '10px',
              fontSize: '20px',
              width: '30px',
              height: '30px',
              backgroundColor: 'transparent',
              border: 'none',
            }}
          >
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
            <div
              ref={containerRef}
              style={{
                overflowX: 'hidden',
                display: 'flex',
                flexDirection: 'row',
                width: '100%', // Adjust width as needed
                margin: '20px 0', // Add margin for spacing
              }}
            >
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
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '10px',
              }}
            >
              <button
                onClick={handleScrollLeft}
                style={{
                  fontSize: '24px',
                  color: 'white',
                  marginRight: '10px',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%', // Make it circular
                  border: '1px solid #ccc',
                  backgroundColor: '#441983',
                  cursor: 'pointer',
                }}
              >
                {'<'}
              </button>
              <div
                style={{
                  width: '200px',
                  height: '10px',
                  backgroundColor: '#eee',
                  borderRadius: '5px',
                  margin: '0 10px',
                  position: 'relative',
                }}
              >
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
                style={{
                  fontSize: '24px',
                  marginLeft: '10px',
                  color: 'white',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%', // Make it circular
                  border: '1px solid #ccc',
                  backgroundColor: '#441983',
                  cursor: 'pointer',
                }}
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
