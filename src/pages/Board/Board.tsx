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
import { orderUpdate } from '../../components/List/types';

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
          description: 'updated',
          order: data.order,
          board: boardId,
        })
      );
      $board.refetch();
    }
  };

  const onNewOrderUpdate =async (data: orderUpdate) => {
    await dispatch(
      listsThunks.editListOrder({
        listId: data.listId,
        order: data.order,
      })
    );
    console.log(data)
    $board.refetch();
  }

  const onCurrentOrderUpdate =async (data: orderUpdate) => {
    await dispatch(
      listsThunks.editListOrder({
        listId: data.listId,
        order: data.order,
      })
    );
    console.log(data)
    $board.refetch();
  }


  //const sortLists = (a: any, b: any): any => {
  //  console.log(a.order, b.order)
    //if (a.order === b.order) return 0;
    //if (a.order > b.order) return 1;
    //if (a.order < b.order) return -1;
  //}

  //console.log(lists[0].order, lists[1].order)
  
  //const listsSorted = (lists.length > 1) ? lists.sort(sortLists) : lists;

  //console.log(lists)
  //const listsSorted = lists
  //console.log(listsSorted.length)

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
                  onNewOrderUpdate={onNewOrderUpdate}
                  onCurrentOrderUpdate={onCurrentOrderUpdate}
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