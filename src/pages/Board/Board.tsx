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
import { OrderUpdateData } from '../../components/List/types';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

export default function BoardPage() {
  const params = useParams();
  const boardId = useSelector((state: AppState) => state.board.id);
  const userId = useSelector((state: AppState) => state.auth.userId);
  const $board = useBoard();
  const dispatch = useAppDispatch();

  const board = $board?.data;
  const boardLists = board?.lists || [];

  const lists = [...boardLists].sort((a, b) => a.order - b.order); // TODO sort by server api params

  useEffect(() => {
    const boardId = parseInt(params.boardId!);
    dispatch(listsActions.setBoardId(boardId));
    dispatch(boardActions.setId(boardId));
  }, [dispatch, params.boardId]);

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
    if (data.name.length !== 0) {
      await dispatch(
        listsThunks.fetchCreate({
          board: boardId,
          description: '',
          name: data.name,
          order: lists.length + 1 || 1,
          owner: userId,
        })
      );

      $board.refetch();
    }
  };

  const onCreateTask = async (data: SubmitData) => {
    if (data.name.length !== 0) {
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
    if (data.name.length !== 0) {
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

  // const onNewOrderUpdate = async (data: OrderUpdateData) => {
  //   await dispatch(
  //     listsThunks.editListOrder({
  //       listId: data.listId,
  //       patch: {
  //         order: data.order,
  //       }
  //     })
  //   );
  //   console.log(data)
  //   $board.refetch();
  // }

  const onCurrentOrderUpdate = async (data: OrderUpdateData) => {
    console.log('onCurrentOrderUpdate', data);


    // await dispatch(
    //   listsThunks.editListOrder({
    //     listId: data.listId,
    //     patch: {
    //       order: data.order,
    //     }
    //   })
    // );
    $board.refetch();
  }


  const onDragEnd = (e: any) => {
    console.log('onDragEnd', e);
    // TODO send api for update lists orders
  };

  const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    display: 'flex',
    padding: 8,
    overflow: 'auto',
  });

  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: 8 * 2,
    margin: `0 ${8}px 0 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  return (
    <>
      <div className={styles.container}>
        <BoardsHeader />

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={'board-' + board.id} direction="horizontal">
            {(provided, snapshot) => (
              <div
                className={styles.list__container}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {lists.map((list, index) => {
                  return (
                    <Draggable key={list.id} draggableId={String(list.id)} index={index}>
                      {(provided2, snapshot2) => (
                        <div
                          ref={provided2.innerRef}
                          {...provided2.draggableProps}
                          {...provided2.dragHandleProps}
                          style={getItemStyle(
                            snapshot2.isDragging,
                            provided2.draggableProps.style
                          )}
                        >
                          <List
                            list={list}
                            tasks={list.tasks}
                            onCreateTask={onCreateTask}
                            onUpdateList={onUpdateList}
                            // onNewOrderUpdate={onNewOrderUpdate}
                            onCurrentOrderUpdate={onCurrentOrderUpdate}
                          />
                        </div>
                      )}

                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
}