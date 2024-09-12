import styles from './LoginFormFields.module.scss';

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormFieldProps {
  data: LoginFormData;
  setData: (value: any) => void;
}

export default function LoginFormFields({
  data,
  setData,
}: LoginFormFieldProps) {
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev: LoginFormData) => ({ ...prev, email: event.target.value }));
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev: LoginFormData) => ({
      ...prev,
      password: event.target.value,
    }));
  };
  return (
    <div className={styles.container}>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={data.email}
          placeholder="ex: your@example.com"
          onChange={handleEmailChange}
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={data.password}
          placeholder="ex: password123"
          onChange={handlePasswordChange}
          required
        />
      </div>
    </div>
  );
}
