'use client';
import { FormEvent, useState } from 'react';
import Image from 'next/image';
import styles from './page.module.scss';
import LoginFormFields from '@components/LoginFormFields/LoginFormFields';
import { useAuthContext } from '@hooks/useAuthContext';
import LoginAction from '@actions/auth/login';
import includeLogo from '@public/icons/logo.png';
import { AuthToken } from '@app/_types/auth/AuthToken';
import { useRouter, useSearchParams } from 'next/navigation';

interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const [data, setData] = useState<LoginFormData>({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuthContext();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleLoginClick = async (e: FormEvent) => {
    e.preventDefault();
    const { email, password } = data;
    const loginRes = await LoginAction({ email, password });
    if (loginRes.ok) {
      login(loginRes.body as AuthToken);
      router.push(searchParams.get('redirect') || '/');
    } else {
      setError(loginRes.error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleLoginClick}>
        <div className={styles.header}>
          <Image src={includeLogo} alt="#include logo" height={58} />
          <h1>Welcome to ICMS</h1>
        </div>
        <div className={styles.field_container}>
          <LoginFormFields data={data} setData={setData} />
          <button className={styles.login_button} type="submit">
            Log-in
          </button>
          {error && <p className={styles.error}>{error}</p>}
        </div>
      </form>
    </div>
  );
}
