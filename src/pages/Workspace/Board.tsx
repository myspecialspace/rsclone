import { Card, Typography } from "antd";
import { Board as IBoard } from "../../types/board";
import styles from './Workspace.module.scss';
import { StarOutlined, LockOutlined } from '@ant-design/icons';

interface Props {
  board: IBoard;
  className?: string;
}

const Board = ({ board, className }: Props) => {
  return (
    <Card
      className={className}
      style={{ backgroundColor: board.backgroundColor }}
    >
      <Typography className={styles.title_board}>{board.name}</Typography>
      <div className={styles.status}><LockOutlined className={styles.lock}/></div>
      <button className={styles.favorites}><StarOutlined className={styles.star}/></button>
    </Card>
  )
};

export default Board;
