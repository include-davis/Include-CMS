'use client';
import formConfig from '@globals/editor.config';
import styles from './page.module.scss';

import ContentHeader from '../../_components/ContentHeader/ContentHeader';
import ContentSection from '../../_components/ContentSection/ContentSection';

interface CollectionPageProps {
  params: {
    collection?: string;
  };
}

export default function CollectionPage({ params }: CollectionPageProps) {
  const { collection } = params;

  // place into hook
  const currentCollection = formConfig.sections.find(
    (section) =>
      section.name.toLowerCase() === collection?.toString().toLowerCase()
  );

  if (!currentCollection) {
    return <div>Invalid collection</div>;
  }

  return (
    <div className={styles.container}>
      <ContentHeader collection={currentCollection.name} />
      <ContentSection />
    </div>
  );
}
