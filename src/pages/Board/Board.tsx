import { Spin } from 'antd';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ErrorLine from '../../components/ErrorLine/ErrorLine';
import List from '../../components/List/List';
import { AppState, useAppDispatch } from '../../store';
import styles from './Board.module.scss';
import * as listsThunks from '../../store/lists/thunks';
import * as taskThunks from '../../store/tasks/thunks';
import * as boardThunks from '../../store/board/thunks';
import { SubmitData } from '../../components/input/Input-data';
import { useSelector } from 'react-redux';
import { listsActions } from '../../store/lists';
import { boardActions } from '../../store/board';
import InputContainer from '../../components/input/Input-container';
import BoardsHeader from '../../components/BoardsHeader/BoardsHeader';
import { useBoard } from '../../store/board/hooks';
import { workspaceActions } from '../../store/workspace';
import { UpdateData } from '../../components/List/Title';
import { OrderUpdateData, deleteList } from '../../components/List/types';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { DropType, getDroppableId, parseDroppableId } from './constants';
import { Task, List as IList } from '../../types/base';
import { DeleteBoard } from '../../store/board/types';
import { useWorkspace } from '../../store/workspace/hooks';
import { getEntityById, removeFromEntities, addToEntities } from '../../helpers/entity';

export default function BoardPage() {
  const params = useParams();
  const boardId = useSelector((state: AppState) => state.board.id);
  const userId = useSelector((state: AppState) => state.auth.userId);
  const $board = useBoard();
  const dispatch = useAppDispatch();
  const $workspace = useWorkspace();
  const board = $board?.data;
  console.log({ board });
  const lists = board?.lists || [];

  useEffect(() => {
    const boardId = parseInt(params.boardId!);
    dispatch(listsActions.setBoardId(boardId));
    dispatch(boardActions.setId(boardId));
  }, [dispatch, params.boardId]);

  useEffect(() => {
    if (board?.workspace?.id) {
      dispatch(workspaceActions.setId(board.workspace.id));
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
      const taskLength = data.list.tasks?.length;
      const order = taskLength ? taskLength : 0;

      await dispatch(
        taskThunks.fetchCreate({
          board: boardId,
          list: data.list.id,
          name: data.name,
          description: '',
          order,
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
  };

  const onDragEnd = async (event: DropResult) => {
    if (!event.destination) {
      return;
    }

    console.log('onDragEnd', event);
    if (event.type === DropType.LIST) {
      onDragList(event);
    }

    if (event.type === DropType.TASK) {
      if (event.source.droppableId === event.destination.droppableId) {
        onDragTask(event);
      } else {
        /** если list.id несовпадают, значит таску бросили в другой список */
        onDragTaskToAnotherList(event);
      }
    }
  };

  type ActionForReorder = { id: number; name: string; patch: { order: number } };
  const getActionsForReorder = (e: DropResult, entities: Array<IList | Task>): ActionForReorder[] => {
    const sourceIndex = e.source.index;
    const destIndex = e.destination!.index;

    if (sourceIndex === destIndex) {
      return []; // TODO
    }
    /** определяем направление перемещения (вперед или назад перетянули лист) */
    const isForward = sourceIndex < destIndex;

    /** меняем местами фром и ту, если направление=назад */
    const fromIndex = isForward ? sourceIndex : destIndex;
    const toIndex = isForward ? destIndex : sourceIndex;

    /** list который перетаскивают */
    const source = entities[sourceIndex];
    /** экшены с данными для запросов */
    const actionPayloads: ActionForReorder[] = [];

    /** экшен на отправку листа, который перетащили */
    actionPayloads.push({
      id: source.id,
      name: source.name,
      patch: {
        order: destIndex,
      }
    });

    /** добавляем 1 если сдвигали лист вперед */
    const add = isForward ? 1 : 0;

    /** цикл по остальным/затронутым листам */
    for (let i = fromIndex + add; i < toIndex + add; i++) {
      const entity = entities[i];
      /** порядок уменьшаем если двигали лист вперед, и увеличиваем если двигали назад */
      const nextOrder = isForward
        ? i - 1
        : i + 1;

      actionPayloads.push({
        id: entity.id,
        name: entity.name,
        patch: {
          order: nextOrder,
        }
      });
    }

    return actionPayloads;
  };

  const getActionsForReorderTasks = (tasks: Task[], position: number, type: 'remove' | 'add'): ActionForReorder[] => {
    const actions: ActionForReorder[] = [];
    const isRemove = type === 'remove';

    const from = isRemove ? position + 1 : position;

    for (let i = from; i < tasks.length; i++) {
      const task = tasks[i];

      actions.push({
        id: task.id,
        name: task.name,
        patch: {
          order: isRemove
            ? task.order - 1
            : task.order + 1
        },
      });
    }

    return actions;
  };

  const onDragList = async (event: DropResult) => {
    const actionsForReorder = getActionsForReorder(event, lists);
    /** отправляем запросы: обновляем ордеры во всех листах, которые были затронуты */
    await Promise.all(actionsForReorder.map((payload) => dispatch(boardThunks.editListOrder({
      listId: payload.id,
      patch: payload.patch,
    }))));

    $board.refetch();
  };

  const onDragTask = async (event: DropResult) => {
    console.log('on drag TASK', event);
    const listId = parseDroppableId(event.source.droppableId);
    const list = lists.find((list) => list.id === listId)!;
    const tasks = list.tasks;
    const actionsForReorder = getActionsForReorder(event, tasks);
    console.log('actionsForReorder', actionsForReorder);

    if (actionsForReorder.length > 0) {
      await Promise.all(actionsForReorder.map((payload) => dispatch(boardThunks.editTaskOrder({
        taskId: payload.id,
        patch: {
          ...payload.patch,
          list: listId,
        },
      }))));

      $board.refetch();
    }
  };

  const onDeleteList = async (data: deleteList) => {
    await dispatch(
      listsThunks.deleteList({
        listId: data.listId,
      })
    );
    $board.refetch();
  };
  const onDeleteBoard = async (boardId: DeleteBoard) => {
    await dispatch(boardThunks.deleteBoard(boardId));
    $workspace.refetch();
  };

  const onDragTaskToAnotherList = async (event: DropResult) => {
    const taskId = parseDroppableId(event.draggableId);
    const sourceListId = parseDroppableId(event.source.droppableId);
    const destListId = parseDroppableId(event.destination!.droppableId);

    type Action = Parameters<typeof dispatch>[0];
    const actions: Action[] = [];

    const sourceList = getEntityById(board.lists, sourceListId)!;
    const destList = getEntityById(board.lists, destListId)!;

    // удалить таску из текущего листа
    actions.push(
      boardThunks.updateList({
        listId: sourceList.id,
        patch: {
          tasks: removeFromEntities(sourceList.tasks, taskId)
        },
      }),
    );

    // добавить таску в другой лист
    actions.push(
      boardThunks.updateList({
        listId: destList.id,
        patch: {
          tasks: addToEntities(destList.tasks, taskId)
        },
      }),
    );

    // сделать -1 ордер в текущем листе для тасок которые ниже
    const sourceReorderActions = getActionsForReorderTasks(sourceList.tasks, event.source.index, 'remove');

    sourceReorderActions.forEach((action) => {
      actions.push(
        boardThunks.editTaskOrder({
          taskId: action.id,
          patch: {
            ...action.patch,
            list: sourceList.id,
          },
        })
      );
    });

    // сделать +1 ордер в другом листе для тасок которые ниже
    const destReorderActions = getActionsForReorderTasks(destList.tasks, event.destination!.index, 'add');

    destReorderActions.forEach((action) => {
      actions.push(
        boardThunks.editTaskOrder({
          taskId: action.id,
          patch: {
            ...action.patch,
            list: destList.id,
          },
        })
      );
    });

    // обновить в таске list id и ордер
    actions.push(
      boardThunks.editTaskOrder({
        taskId,
        patch: {
          order: event.destination!.index,
          list: destList.id,
        },
      })
    );

    // TODO
    // удалить таску из текущего листа
    // добавить таску в другой лист
    // сделать -1 ордер в текущем листе для тасок которые ниже
    // сделать +1 ордер в другом листе для тасок которые ниже
    // обновить в таске list id и ордер

    await Promise.all(
      actions.map((action) => dispatch(action))
    );

    $board.refetch();
  };


  const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? 'lightblue' : '#eff8ff',
    display: 'flex',
    // padding: 8,
    overflow: 'auto',
  });

  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: `0 ${8 * 2}px`,
    // margin: `0 ${8}px 0 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : '#eff8ff',

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  console.log('renderer Board');

  return (
    <>
      <div className={styles.container}>
        <BoardsHeader onDeleteBoard={onDeleteBoard} />

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={getDroppableId.board(board.id)} direction="horizontal" type={DropType.LIST}>
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
                            onCurrentOrderUpdate={onCurrentOrderUpdate}
                            onDeleteList={onDeleteList}
                          />
                        </div>
                      )}

                    </Draggable>
                  );
                })}
                {provided.placeholder}
                <InputContainer
                  type='list'
                  onCreateList={onCreateList}
                />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
}
