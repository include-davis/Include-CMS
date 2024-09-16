'use client';
import { FormEvent, useState } from 'react';
import Image from 'next/image';
import styles from './page.module.scss';
import LoginFormFields from '../_components/LoginFormFields/LoginFormFields';
import { useAuthContext } from '@hooks/useAuthContext';
import LoginAction from '@actions/auth/login';
import includeLogo from '@public/icons/logo.png';
import { AuthToken } from '@app/_types/auth/AuthToken';
import { useRouter, useSearchParams } from 'next/navigation';

import Logout from '@actions/auth/logout';

interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const [data, setData] = useState<LoginFormData>({ email: '', password: '' });
  const { login, logout } = useAuthContext();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleLoginClick = async (e: FormEvent) => {
    e.preventDefault();
    const { email, password } = data;
    const loginRes = await LoginAction({ email, password });
    if (loginRes.ok) {
      login(loginRes.body as AuthToken);
    }
    router.push(searchParams.get('redirect') || '/');
  };

  const handleLogoutClick = async () => {
    logout();
    await Logout();
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
        </div>
      </form>
      <button onClick={handleLogoutClick}>Log-out</button>
    </div>
  );
}
