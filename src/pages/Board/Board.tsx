import { useParams } from 'react-router-dom';
import ListContent from '../../components/List/List-content';
// import { useBoard } from '../../store/board/thunks';
import styles from './Board.module.scss';

export default function BoardPage() {
  const params = useParams();
  console.log('params', params);

  // const boardId = parseInt(params.boardId || '');
  // const board = useBoard(boardId);

  // console.log('board', board);


  return (
    <div className={styles.container}>
      {/* {board.data.name} */}
      <ListContent />
    </div>
  )
}