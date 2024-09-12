'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.scss';
import LoginFormFields from '../_components/LoginFormFields/LoginFormFields';
import { useAuthContext } from '@hooks/useAuthContext';
import LoginAction from '@actions/auth/login';
import includeLogo from '/public/icons/logo.png';
import { AuthToken } from '@app/_types/auth/AuthToken';
import { useRouter, useSearchParams } from 'next/navigation';

import Logout from '@app/(api)/_actions/auth/logout';

interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const [data, setData] = useState<LoginFormData>({ email: '', password: '' });
  const { login, logout } = useAuthContext();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleLoginClick = async () => {
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
      <div className={styles.form}>
        <div className={styles.header}>
          <Image src={includeLogo} alt="#include logo" height={100} />
          <h1>Welcome to ICMS</h1>
        </div>
        <LoginFormFields data={data} setData={setData} />
        <div className={styles.additional_login_info}>
          <div className={styles.remember_me_container}>
            <label>Remember Me</label>
            <input type="checkbox" />
          </div>
          <Link href={`/`}>Forgot Password?</Link>
        </div>
        <button className={styles.login_button} onClick={handleLoginClick}>
          Log-in
        </button>
        <button className={styles.login_button} onClick={handleLogoutClick}>
          Log-out
        </button>
        <div className={styles.divider}>
          <div className={styles.line} />
          <p>Or login with</p>
          <div className={styles.line} />
        </div>
        <button>GMAIL</button>
      </div>
    </div>
  );
}
