import styles from './layout.module.scss';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      {children}
      <div className={styles.auth_decorator} />
    </div>
  );
}
