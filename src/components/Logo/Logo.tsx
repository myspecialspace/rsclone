import { Link } from 'react-router-dom';
import styles from './Logo.module.scss';

export default function Logo() {
  return (
  <div className={styles.logo}>
    <Link to="/about" className={styles.logo_link}>
      <div className={styles.logo__img}></div>
      <div className={styles.logo__text}>
        <p className={styles.logo__title}>RSClone</p>
        <h1>Trello</h1>
      </div>
    </Link>
  </div>
  )
}