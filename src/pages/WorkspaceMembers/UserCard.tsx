import { Card, Avatar } from "antd";
import { getBgColor, getFirstChar } from "../../helpers/user";
import { User } from "../../types/base";
import styles from './UserCard.module.scss';

const UserCard = ({ user }: { user: User }) => (
  <Card className={styles.memberTile} key={user.id}>
    <div className={styles.body}>
      <Avatar style={{ backgroundColor: getBgColor(user), flexShrink: 0 }}>{getFirstChar(user)}</Avatar>
      <div>
        <div>{user.username}</div>
        <div>{user.email}</div>
      </div>
    </div>
  </Card>
);

export default UserCard;