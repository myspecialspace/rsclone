import classNames from 'classnames';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { mainPageContent } from '../Constants/constant';

interface HeaderProps {
  className: string;
}

export default function Header(props: HeaderProps) {
  return (
    <div className={classNames(props.className, styles.header)}>
      <div className={styles.header__wrapper}>
        <div className={styles.logo}>
          <Link to="/about" className={styles.logo_link}>
            <div className={styles.logo__img}></div>
            <div className={styles.logo__text}>
              <p className={styles.logo__title}>RSClone</p>
              <h1>Trello</h1>
            </div>
          </Link>
        </div>
        <div className={styles.buttons_container}>
          <form className={styles.len}>
            <select className={styles.len__select}>
              <option className={styles.len__options} defaultValue="" hidden disabled>{mainPageContent.LEN_BUTTON}</option>
              <option className={styles.len__options}>{mainPageContent.LEN_BUTTON}</option>
              <option className={styles.len__options}>{mainPageContent.CHANGE_LEN}</option>
            </select>
          </form>
          <Link to="/login" className={styles.link}>
            <div className={styles.login__button}>{mainPageContent.LOG_IN_BUTTON}</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
