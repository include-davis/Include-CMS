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
import { useState } from 'react';
import CollectionCard from './_component/CollectionCard/CollectionCard';

export default function Home() {
  const [extended, setExtended] = useState(false);
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
    setExtended(true);
  };
  return (
    <main>
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
            Expand to see all
          </span>
          <button
            onClick={handleExtendClick}
            style={{
              marginLeft: '10px',
              fontSize: '20px',
              width: '30px',
              height: '30px',
              backgroundColor: 'transparent',
              // border: 'none',
            }}
          >
            {'>'}
          </button>
        </div>
      </div>
      <div style={{ overflowX: 'auto', display: 'flex', flexDirection: 'row' }}>
        {collections.map((collection, index) => (
          <div key={index} style={{ marginRight: '20px', marginTop: '20px' }}>
            <CollectionCard name={collection.name} images={collection.images} />
          </div>
        ))}
      </div>
    </main>
  );
}
