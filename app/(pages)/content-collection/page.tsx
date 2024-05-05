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
      images: ['/index/city.jpg'],
    },
  ];

  return (
    <main>
      {collections.map((collection, index) => (
        <div key={index}>
          <h1>{collection.name}</h1>
          <CollectionCard images={collection.images} />
        </div>
      ))}
    </main>
  );
}
