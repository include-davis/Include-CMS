'use client';
import { FormEvent, useState } from 'react';
import Image from 'next/image';
import styles from './page.module.scss';
import LoginFormFields from '@components/LoginFormFields/LoginFormFields';
import { useAuthContext } from '@hooks/useAuthContext';
import RegistrationAction from '@actions/auth/register';
import includeLogo from '@public/icons/logo.png';
import { AuthToken } from '@app/_types/auth/AuthToken';
import { useRouter, useSearchParams } from 'next/navigation';

interface RegistrationFormData {
  email: string;
  password: string;
}

export default function Register() {
  const [data, setData] = useState<RegistrationFormData>({
    email: '',
    password: '',
  });
  const { login } = useAuthContext();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleRegistrationSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { email, password } = data;
    const registerData = new FormData();
    registerData.set('email', email);
    registerData.set('password', password);
    const registerRes = await RegistrationAction(registerData);
    if (registerRes.ok) {
      login(registerRes.body as AuthToken);
    }
    router.push(searchParams.get('redirect') || '/');
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleRegistrationSubmit}>
        <div className={styles.header}>
          <Image src={includeLogo} alt="#include logo" height={58} />
          <h1>Welcome to ICMS</h1>
        </div>
        <div className={styles.field_container}>
          <LoginFormFields data={data} setData={setData} />
          <button className={styles.login_button} type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
