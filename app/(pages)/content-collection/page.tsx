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
import CollectionCard from './_component/CollectionCard/CollectionCard';

export default function Home() {
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
  return (
    <main
      style={{
        overflowX: 'auto',
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: '20px',
      }}
    >
      <div style={{ marginTop: '20px', fontSize: '24px', fontWeight: 'bold' }}>
        Published [{collections.length} items]
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
