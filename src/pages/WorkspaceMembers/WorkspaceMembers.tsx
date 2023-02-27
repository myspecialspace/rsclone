import { Avatar, Card, Select } from 'antd';
import { getBgColor, getFirstChar } from '../../helpers/user';
import { useWorkspace } from '../../store/workspace/hooks';
import { User } from '../../types/base';
import styles from './WorkspaceMembers.module.scss';
import { WorkspaceMembersContent } from '../../components/Constants/constant';


const UserCard = ({ user }: { user: User }) => (
  <Card className={styles.memberTile} key={user.id}>
    <div className={styles.body}>
      <Avatar style={{ backgroundColor: getBgColor(user) }}>{getFirstChar(user)}</Avatar>
      <div>{user.username}</div>
    </div>
  </Card>
);

export default function WorkspaceMembersPage() {
  const $workspace = useWorkspace();
  const members = $workspace.data?.members || [];

  return <div className={styles.workspaceMembers}>
    <div className={styles.title}>{WorkspaceMembersContent.ADD_MEMBERS}</div>
    <Select
      showSearch
      style={{ width: 200 }}
      placeholder="Search to Select"
      optionFilterProp="children"
    />

    <div className={styles.title}>{WorkspaceMembersContent.MEMBERS}</div>
    <div className={styles.memberTiles}>
      {members.map((member) => <UserCard key={member.id} user={member} />)}
    </div>
  </div>
}
