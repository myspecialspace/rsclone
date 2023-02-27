import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';

export default function NotFoundPage() {
  return (
    <div className={styles.page}>
      <div className={styles.page__title}>
        <h1>404</h1>
        <h2>Ooops, something goes wrong</h2>
      </div>
      <div className={styles.page__more}>
        <Link to='/about'>Back To Home</Link>
      </div>
      <div className={styles.page__link}>
        <Link to='/about'>
          <span>About</span>
        </Link>
        <Link to='/boards'>
          <span>Boards</span>
        </Link>
        <Link to='/login'>
          <span>Login</span>
        </Link>
        <Link to='/registration'>Registration</Link>
      </div>

      <div className={styles.copyright}>
        <p>© 2023</p>
      </div>
    </div>
  );
}
