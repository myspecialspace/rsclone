import { Spin } from 'antd';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ErrorLine from '../../components/ErrorLine/ErrorLine';
import List from '../../components/List/List';
import { AppState, useAppDispatch } from '../../store';
import styles from './Board.module.scss';
import * as listsThunks from '../../store/lists/thunks';
import * as taskThunks from '../../store/tasks/thunks';
import { SubmitData } from '../../components/input/Input-data';
import { useSelector } from 'react-redux';
import { listsActions } from '../../store/lists';
import { boardActions } from '../../store/board';
import InputContainer from '../../components/input/Input-container';
import BoardsHeader from '../../components/BoardsHeader/BoardsHeader';
import { useBoard } from '../../store/board/hooks';
import { workspaceActions } from '../../store/workspace';
import { UpdateData } from '../../components/List/Title';

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
    if (board?.workspace?.id) {
      dispatch(workspaceActions.setId(
        board.workspace.id
      ));
    }
  }, [dispatch, board]);

  if ($board.isPending || $board.isInitial) {
    return <Spin />;
  }

  if ($board.isError) {
    return <ErrorLine />;
  }

  const onCreateList = async (data: SubmitData) => {
    if(data.name.length !== 0) {
      await dispatch(
        listsThunks.fetchCreate({
          board: boardId,
          description: '',
          name: data.name,
          order: lists.length + 1  || 1,
          owner: userId,
        })
      );

      $board.refetch();
    }
  };

  const onCreateTask = async (data: SubmitData) => {
    if(data.name.length !== 0) {
      await dispatch(
        taskThunks.fetchCreate({
          board: boardId,
          list: data.list.id,
          name: data.name,
          description: '',
          order: data.list.tasks.length + 1 || 1,
          owner: userId,
        })
      );

      $board.refetch();
    }
  };

  const onUpdateList = async (data: UpdateData) => {
    if(data.name.length !== 0) {
      await dispatch(
        listsThunks.editList({
          listId: data.listId,
          name: data.name,
          //description: '',
          order: data.order,
          board: boardId,
        })
      );

      $board.refetch();
    }
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
                  onUpdateList={onUpdateList}
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