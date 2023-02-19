import { /*Button, Input, Modal,*/ Spin } from 'antd';
import { useEffect /*useState */ } from 'react';
import { useParams } from 'react-router-dom';
import ErrorLine from '../../components/ErrorLine/ErrorLine';
import List from '../../components/List/List';
//import { BOARD_BG_COLOR } from '../../helpers/defaults';
import { AppState, useAppDispatch } from '../../store';
import { useLists } from '../../store/lists/hooks';
import styles from './Board.module.scss';
import * as listsThunks from '../../store/lists/thunks';
import * as taskThunks from '../../store/tasks/thunks';
import { useTasks } from '../../store/tasks/hooks';
import { SubmitData } from '../../components/input/Input-task';
import { useSelector } from 'react-redux';
import { listsActions } from '../../store/lists';
import { boardActions } from '../../store/board';
import InputContainer from '../../components/input/Input-container';
import BoardsHeader from '../../components/BoardsHeader/BoardsHeader';

export default function BoardPage() {
  const params = useParams();
  const boardId = useSelector((state: AppState) => state.board.id);
  //const [isModalOpen, setIsModalOpen] = useState(false);
  //const [listName, setListName] = useState('');
  //const [listBgColor, setListBgColor] = useState(BOARD_BG_COLOR);
  const $lists = useLists();
  const lists = $lists.data;
  const dispatch = useAppDispatch();
  const $tasks = useTasks(boardId);
  const tasks = $tasks.data;

  useEffect(() => {
    const boardId = parseInt(params.id!);

    dispatch(listsActions.setBoardId(boardId));
    dispatch(boardActions.setId(boardId));
  }, [dispatch, params.id]);

  const onCreateList = async (data: SubmitData) => {
    await dispatch(
      listsThunks.fetchCreate({
        board: boardId,
        description: '',
        name: data.taskName,
        order: lists.length || 0,
      })
    );

    $lists.refetch();
    //setIsModalOpen(false);
  };

  if ($lists.isPending || $lists.isInitial) {
    return <Spin />;
  }

  if ($lists.isError) {
    return <ErrorLine />;
  }

  const onCreateTask = async (data: SubmitData) => {
    await dispatch(
      taskThunks.fetchCreate({
        board: boardId,
        list: data.listId,
        name: data.taskName,
        description: '',
        order: tasks.length || 0,
      })
    );

    $tasks.refetch();
  };

  return (
    <>
      <div className={styles.container}>
        <BoardsHeader />
        <div className={styles.list__container}>
          {lists.map((list) => {
            const listTasks = tasks.filter((task) => task.list.id === list.id);

            return (
              <div key={list.id}>
                <List
                  list={list}
                  tasks={listTasks}
                  onCreateTask={onCreateTask}
                />
              </div>
            );
          })}
          <InputContainer
            type='list'
            listId={lists.length + 1}
            onCreateList={onCreateList}
          ></InputContainer>
        </div>
      </div>
    </>
  );
}

//<Button type="primary" onClick={() => setIsModalOpen(true)}>+ Create list</Button>

/*
        <Modal title={'Создание списка'} open={isModalOpen} onOk={onCreateList} onCancel={() => setIsModalOpen(false)}>
          <Input
            placeholder={'Название списка'}
            value={listName}
            onChange={(e) => setListName(e.target.value)}
          />
          <div>{'Цвет списка'}</div>
          <input type="color" value={listBgColor} onChange={(e) => setListBgColor(e.target.value)} />
        </Modal>
*/
