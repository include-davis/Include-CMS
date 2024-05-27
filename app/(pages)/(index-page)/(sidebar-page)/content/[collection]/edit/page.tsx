'use client';
import EditorPage from './_components/EditorPage';

interface EditPageProps {
  params: {
    collection?: string;
  };
}

const Page: React.FC<EditPageProps> = ({ params }) => {
  const { collection } = params;

  return <EditorPage collection={collection} />;
};

export default Page;
