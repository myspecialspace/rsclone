import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import styles from './Layout.module.scss';

export default function Layout() {
  return (
    <div className={styles.layout}>
      <Header className={styles.header} />
      <div className={styles.router}>
        <Outlet />
      </div>
      <Footer className={styles.footer} />
    </div>
  )
}