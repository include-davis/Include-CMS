'use client';
import schema from '@configs/_schema/_index';
import ContentForm from '../../_components/ContentForm/ContentForm';
import ContentFormContextProvider from '@contexts/ContentFormContext';
import useContent from '@hooks/useContent';
import uploadMedia from '@actions/cloudinary/uploadMedia';

interface CreateContentProps {
  params: {
    collection: string;
    id: string;
  };
}

export default function CreateContent({ params }: CreateContentProps) {
  const { collection, id } = params;
  const schema_collection = schema[collection];

  const { data, loading } = useContent(collection, id);

  if (loading) {
    return 'loading...';
  }

  return (
    <ContentFormContextProvider
      collection={schema_collection.name.toLowerCase()}
      initialValue={data}
    >
      <ContentForm
        type="Edit"
        collection={schema_collection.name.toLowerCase()}
      />
      <button
        onClick={async () => {
          uploadMedia({
            file: 'blob:http://localhost:3000/e8300394-5ee6-4df3-9a35-868cc26c5ebf',
          });
        }}
      >
        UPLOAD IMAGE
      </button>
    </ContentFormContextProvider>
  );
}
