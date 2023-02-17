import { Board as IBoard } from "../../store/boards/types";

interface Props {
  board: IBoard;
  className?: string;
}

const Board = ({ board, className }: Props) => {
  return <div
    className={className}
    style={{ backgroundColor: board.backgroundColor }}
  >{board.name}</div>
};

export default Board;