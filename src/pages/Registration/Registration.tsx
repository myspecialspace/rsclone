import FormSignUp from '../../components/Forms/Form-sign-up';
import styles from './Registration.module.scss';
import Logo from '../../components/Logo/Logo';

export default function RegistrationPage() {
  return (
    <div className={styles.login}>
      <header className={styles.header}>
        <div className={styles.header__wrapper}>
          <Logo/>
        </div>
      </header>
      <div className={styles.wrapper_img}></div>
      <div className={styles.main__wrapper}>
        <FormSignUp />
      </div>
    </div>
  )
}