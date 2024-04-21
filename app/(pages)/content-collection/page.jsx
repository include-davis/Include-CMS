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
import React from "react";
import CollectionCard from "./_component/CollectionCard/CollectionCard";

export default function Home() {
  const images = [
    "/index/city.jpg",
    "/index/city.jpg",
    "/index/city.jpg",
    "/index/city.jpg",
  ];
  const images2 = [
    "/index/city.jpg",
    "/index/city.jpg",
  ];
  const images3 = [
    "/index/city.jpg",
  ];

  return (
    <main>
      <h1>Wedding</h1>
      <CollectionCard images={images} />
      <CollectionCard images={images2} />
      <CollectionCard images={images3} />
      {/* <MediaCardPlaceholder />
      <PreviewCardPlaceholder /> */}
    </main>
  );
}
