import styles from './Workspace.module.scss';
import { MenuContainer, MenuShowButton } from '../../components/Menu/Menu';
import { WorkspaceName, WorkspaceContent } from '../../components/Constants/constant';

export default function WorkspacePage() {
    return (
      <div className={styles.main}>
        <MenuContainer />
        <MenuShowButton />
        <div className={styles.main__content}>
          <div className={styles.current__workspace}>
            <h2 className={styles.title}>{WorkspaceName}</h2>
          </div>
          <div className={styles.boards}>
            <h2 className={styles.title}>{WorkspaceContent.BOARDS_TITLE}</h2>
            <div className={styles.column}></div>
          </div>
        </div>
      </div>
    )
  }