import { Card } from 'antd';
import { Title, UpdateData } from './Title';
import styles from './List.module.scss';
import Task from '../Task/Task';
import InputContainer from '../input/Input-container';
import { List as IList } from '../../types/list';
import { Task as ITask } from '../../types/task';
import { SubmitData } from '../input/Input-data';
import { useState } from 'react';
import { OrderUpdateData } from './types';

const TASK_COLOR = 'white';
interface ListProps {
  list: IList;
  tasks: ITask[];
  onCreateTask: (data: SubmitData) => any;
  onUpdateList: (data: UpdateData) => any;
  // onNewOrderUpdate: (data: any) => any;
  onCurrentOrderUpdate: (data: OrderUpdateData) => any;
}

const DATA_KEY = 'fromListId';

export default function List({ list, tasks, onCreateTask, onUpdateList, onCurrentOrderUpdate }: ListProps) {

  const onSubmitUpdate = (data: UpdateData) => {
    if (onUpdateList !== undefined) {
      onUpdateList(data);
    }
  };

  //drag and drop

  const [currentList, setCurrentList] = useState(list);
  const [newList, setNewList] = useState(list);
  const [currentOrder, setCurrentOrder] = useState(list.order);
  const [newOrder, setNewOrder] = useState(list.order);

  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>, list: IList,) => {
    setCurrentList(list);
    setCurrentOrder(list.order);
    e.dataTransfer.setData(DATA_KEY, String(list.id));
    // console.log("порядок текущего листа", currentOrder, "list id ", currentList.id);
  }

  function dragEndHandler(e: React.DragEvent<HTMLDivElement>) {
    (e.target as HTMLElement).style.background = `${TASK_COLOR}`;
  }

  function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    (e.target as HTMLElement).style.background = 'lightblue';
  }

  const dropHandler = (e: React.DragEvent<HTMLDivElement>, list: IList) => {
    const fromListId = parseInt(e.dataTransfer.getData(DATA_KEY));
    e.preventDefault();
    setNewList(list);
    setNewOrder(list.order);
    // console.log("новый порядок  лист", newOrder, 'id', currentList.id)
    // console.log('поменять текущий порядок на ', { listId: currentList.id, order: newOrder})
    // console.log('поменять новый порядок на ', { listId: newList.id, order: currentOrder})

    // onNewOrderUpdate({ listId: currentList.id, order: newOrder });
    onCurrentOrderUpdate({ fromListId, toListId: list.id });
  }

  return (
    <div>
      <Card
        onDragStart={(e) => dragStartHandler(e, list)}
        onDragLeave={(e) => dragEndHandler(e)}
        onDragEnd={(e) => dragEndHandler(e)}
        onDragOver={(e) => dragOverHandler(e)}
        onDrop={(e) => dropHandler(e, list)}
        draggable={true}
        className={styles.list}>
        <Title title={list.name} list={list} listId={list.id} onSubmitUpdate={onSubmitUpdate}></Title>
        {tasks.map((task) => (<Task key={task.id} task={task} listId={list.id} />))}
        <InputContainer type='task' list={list} onCreateTask={onCreateTask} />
      </Card>
    </div>
  )
}


