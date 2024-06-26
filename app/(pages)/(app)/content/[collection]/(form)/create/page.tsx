// import styles from './page.module.scss';
import schema from '@configs/_schema/_index';

interface CreateContentProps {
  params: {
    collection: string;
  };
}

export default function CreateContent({ params }: CreateContentProps) {
  const { collection } = params;

  // place into hook
  const currentCollection = schema[collection];

  if (!currentCollection) {
    return "Page doesn't exist";
  }

  const collectionName = currentCollection?.name;
  return <div>{collectionName}</div>;
}
