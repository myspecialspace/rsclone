import { Card, Typography } from "antd";
import { Board as IBoard } from "../../types/board";
import styles from './Workspace.module.scss';

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
    </Card>
  )
};

export default Board;
 /*<div
   className={className}
   style={{ backgroundColor: board.backgroundColor }}
 >{board.name}</div>*/