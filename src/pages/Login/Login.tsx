import styles from './Login.module.scss';
import Form from '../../components/Forms/Form';

export default function LoginPage() {
  return (
    <div className={styles.login}>
      <div className={styles.wrapper_img}></div>
      <div className={styles.main__wrapper}>
        <Form />
      </div>
    </div>
  )
}
