import styles from './Workspace.module.scss';
import MenuContainer from '../../components/Menu/Menu';

export default function WorkspacePage() {
    return (
      <div className={styles.login}>
        <MenuContainer />
      </div>
    )
  }