'use client';
import formConfig from '@globals/editor.config';
import styles from './page.module.scss';
interface CollectionPageProps {
  params: {
    collection?: string;
  };
}

const CollectionPage: React.FC<CollectionPageProps> = ({ params }) => {
  const { collection } = params;
  const currentSection = formConfig.sections.find(
    (section) =>
      section.name.toLowerCase() === collection?.toString().toLowerCase()
  );
  if (!currentSection) {
    return <div>Invalid collection</div>;
  }
  return (
    <main className={styles.main}>
      <h1>{currentSection.name}</h1>
    </main>
  );
};

export default CollectionPage;
