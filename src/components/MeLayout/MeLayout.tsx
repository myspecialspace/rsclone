import { Outlet, useParams } from 'react-router-dom';
import styles from './MeLayout.module.scss';
import WorkspaceNav from '../WorkspaceNav/WorkspaceNav';


export default function MeLayout() {
  const params = useParams();

  console.log('params', params);

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={styles.logo}></div>
        <div className={styles.name}>Trello</div>
      </header>
      <div className={styles.wrapper}>
        <WorkspaceNav className={styles.sidebar} />
        <Outlet />
      </div>
    </div >
  )
}