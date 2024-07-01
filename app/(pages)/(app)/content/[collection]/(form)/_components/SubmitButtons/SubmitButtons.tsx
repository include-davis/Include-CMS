import styles from './SubmitButtons.module.scss';

interface SubmitButtonsProps {
  submission_type: string;
}

export default function SubmitButtons({
  submission_type: _,
}: SubmitButtonsProps) {
  return (
    <div className={styles.container}>
      <button className={styles.save_button}>Save Draft</button>
      <button className={styles.publish_button}>Publish Draft</button>
    </div>
  );
}
