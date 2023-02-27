import styles from './Login.module.scss';
import FormLogin from '../../components/Forms/Form-login';
import Logo from '../../components/Logo/Logo';

export default function LoginPage() {
  return (
    <div className={styles.login}>
      <header className={styles.header}>
        <div className={styles.header__wrapper}>
          <Logo/>
        </div>
      </header>
      <div className={styles.wrapper_img}></div>
      <div className={styles.main__wrapper}>
        <FormLogin />
      </div>
    </div>
  )
}
