import styles from './About.module.scss';
import { mainPageContent } from '../../components/Constants/constant';
import image from '../../assets/img/TrelloUICollage.jpg';

export default function AboutPage() {
  return (
    <main className={styles.main}>
    <section className={styles.about}>
      <div className={styles.wrapper}>
        <div className={styles.about__container}>
          <div className={styles.about__content}>
            <h2 className={styles.about__title}>{mainPageContent.TITLE}</h2>
            <p className={styles.about__text}>{mainPageContent.TEXT}</p>
            <form action="#!" className={styles.sign__form}>
              <input type="email" name="email" className={styles.sign__field} placeholder="Email" />
              <button type="submit" className={styles.sign__submit}>{mainPageContent.SIGN_UP_BUTTON}</button>
            </form>
          </div>
          <div className={styles.img__container}>
            <img src={image} alt="College" className={styles.about__img} />
          </div>
        </div>
      </div>
    </section>
  </main>
  )
}