import FormSignUp from '../../components/Forms/Form-sign-up';
import styles from './Registration.module.scss';

export default function RegistrationPage() {
  return (
    <div className={styles.login}>
      <div className={styles.wrapper_img}></div>
      <div className={styles.main__wrapper}>
        <FormSignUp />
      </div>
    </div>
  )
}