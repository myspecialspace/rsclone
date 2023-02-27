import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

import styles from './Layout.module.scss';



export default function Layout() {
  return (
    <div className={styles.layout}>

      <div className={styles.router}>
        <Outlet />
      </div>
      <Footer className={styles.footer} />
    </div>
  )
}