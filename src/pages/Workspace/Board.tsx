import { Card, Typography } from 'antd';
import { Board as IBoard } from '../../types/board';
import styles from './Workspace.module.scss';
import { StarOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';

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
      <Typography className={styles.description_board}>
        {board.description}
      </Typography>
      <div className={styles.status}>
        {board.isPrivate ? (
          <LockOutlined className={styles.lock} />
        ) : (
          <UnlockOutlined className={styles.lock} />
        )}
      </div>
      <div className={styles.favorites}>
        {board.isFavorite ? <StarOutlined className={styles.star} /> : <></>}
      </div>
    </Card>
  );
};

export default Board;
