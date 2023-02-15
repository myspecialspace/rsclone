import styles from './Workspace.module.scss';
import { WorkspaceContent, WorkspaceName } from '../../components/Constants/constant';
import { UserAddOutlined } from '@ant-design/icons';
import { Button, Space} from 'antd';


export default function WorkspacePage() {

    return (
      <div className={styles.main}>
        <div className={styles.main__content}>
          <div className={styles.current__workspace}>
            <h2 className={styles.title}>{WorkspaceName}</h2>
            <Space align="center">
              <Button type="primary" icon={<UserAddOutlined />}>Invite Workspace members</Button>
            </Space>
          </div>
          <hr className='horizontal'/>

          <div className={styles.boards}>
            <h2 className={styles.title}>{WorkspaceContent.WORKSPACE_TITLE}</h2>
            <div className={styles.column}></div>
          </div>
        </div>
      </div>

    )

}

