import { Spin } from 'antd';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ErrorLine from '../../components/ErrorLine/ErrorLine';
import List from '../../components/List/List';
import { AppState, useAppDispatch } from '../../store';
import styles from './Board.module.scss';
import * as listsThunks from '../../store/lists/thunks';
import * as taskThunks from '../../store/tasks/thunks';
import { SubmitData } from '../../components/input/Input-task';
import { useSelector } from 'react-redux';
import { listsActions } from '../../store/lists';
import { boardActions } from '../../store/board';
import InputContainer from '../../components/input/Input-container';
import BoardsHeader from '../../components/BoardsHeader/BoardsHeader';
import { useBoard } from '../../store/board/hooks';
import { workspaceActions } from '../../store/workspace';

export default function BoardPage() {
  const params = useParams();
  const boardId = useSelector((state: AppState) => state.board.id);
  const userId = useSelector((state: AppState) => state.auth.userId);
  const $board = useBoard();
  const dispatch = useAppDispatch();

  const board = $board?.data;
  const lists = board?.lists || [];

  useEffect(() => {
    const boardId = parseInt(params.id!);

    dispatch(listsActions.setBoardId(boardId));
    dispatch(boardActions.setId(boardId));
  }, [dispatch, params.id]);

  useEffect(() => {
    dispatch(workspaceActions.setId(
      board.workspace.id
    ));
  }, [dispatch, board]);

  if ($board.isPending || $board.isInitial) {
    return <Spin />;
  }

  if ($board.isError) {
    return <ErrorLine />;
  }

  const onCreateList = async (data: SubmitData) => {
    await dispatch(
      listsThunks.fetchCreate({
        board: boardId,
        description: '',
        name: data.taskName,
        order: lists.length || 0,
        owner: userId,
      })
    );

    $board.refetch();
  };

  const onCreateTask = async (data: SubmitData) => {
    await dispatch(
      taskThunks.fetchCreate({
        board: boardId,
        list: data.list.id,
        name: data.taskName,
        description: '',
        order: data.list.tasks.length || 0,
        owner: userId,
      })
    );

    $board.refetch();
  };

  return (
    <>
      <div className={styles.container}>
        <BoardsHeader />
        <div className={styles.list__container}>
          {lists.map((list) => {
            return (
              <div key={list.id}>
                <List
                  list={list}
                  tasks={list.tasks}
                  onCreateTask={onCreateTask}
                />
              </div>
            );
          })}
          <InputContainer
            type='list'
            onCreateList={onCreateList}
          ></InputContainer>
        </div>
      </div>
    </>
  );
}