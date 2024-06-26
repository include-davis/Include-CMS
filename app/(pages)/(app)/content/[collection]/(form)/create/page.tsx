import schema from '@configs/_schema/_index';
import ContentForm from '../_components/ContentForm/ContentForm';
import ContentFormContextProvider from '@contexts/ContentFormContext';

interface CreateContentProps {
  params: {
    collection: string;
  };
}

export default function CreateContent({ params }: CreateContentProps) {
  const { collection } = params;
  const schema_collection = schema[collection];

  return (
    <ContentFormContextProvider
      collection={schema_collection.name.toLowerCase()}
    >
      <ContentForm
        type="Create"
        collection={schema_collection.name.toLowerCase()}
      />
    </ContentFormContextProvider>
  );
}
