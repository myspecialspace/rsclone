import { useParams } from 'react-router-dom';
// import { useBoard } from '../../store/board/thunks';
import styles from './Board.module.scss';

export default function BoardPage() {
  const params = useParams();
  console.log('params', params);

  // const boardId = parseInt(params.boardId || '');
  // const board = useBoard(boardId);

  // console.log('board', board);


  return (
    <div className={styles.header}>
      {/* {board.data.name} */}
      BoardPage
    </div>
  )
}