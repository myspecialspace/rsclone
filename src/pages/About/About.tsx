import styles from './About.module.scss';
import { mainPageContent } from '../../components/Constants/constant';
import image from '../../assets/img/TrelloUICollage.jpg';
import Logo from "../../components/Logo/Logo";
import Header from "../../components/Header/Header";
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className={styles.main}>
      <header className={styles.header}>
        <div className={styles.header__wrapper}>
          <Logo/>
          <Header className={styles.header__settings} />
        </div>
      </header>
      <main className={styles.about}>
        <div className={styles.wrapper}>
          <div className={styles.about__container}>
            <div className={styles.about__content}>
              <h2 className={styles.about__title}>{mainPageContent.TITLE}</h2>
              <p className={styles.about__text}>{mainPageContent.TEXT}</p>
              <form action="#!" className={styles.sign__form}>
                <Link to="/registration" className={styles.link}>
                  <div className={styles.sign__submit}>{mainPageContent.SIGN_UP_BUTTON}</div>
                </Link>
              </form>
            </div>
            <div className={styles.img__container}>
              <img src={image} alt="College" className={styles.about__img} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}