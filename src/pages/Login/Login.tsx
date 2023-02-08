import styles from './Login.module.scss';
import FormLogin from '../../components/Forms/Form-login';

export default function LoginPage() {
  return (
    <div className={styles.login}>
      <div className={styles.wrapper_img}></div>
      <div className={styles.main__wrapper}>
        <FormLogin />
      </div>
    </div>
  )
}
