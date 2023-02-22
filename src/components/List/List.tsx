import { Card } from 'antd';
import { Title, UpdateData} from './Title';
import styles from './List.module.scss';
import Task from '../Task/Task';
import InputContainer from '../input/Input-container';
/*
import ListInterface from '../../components/Interfaces/List-interface';
import TaskInterface from '../../components/Interfaces/Task-interface';
*/
import { List as IList } from '../../types/list';
import { Task as ITask } from '../../types/task';
import { SubmitData } from '../input/Input-data';
interface ListProps {
  list: IList;
  tasks: ITask[];
  onCreateTask: (data: SubmitData) => any;
  onUpdateList: (data: UpdateData) => any;
}

export default function List({ list, tasks, onCreateTask, onUpdateList }: ListProps) {

  const onSubmitUpdate = (data: UpdateData) => {
    if (onUpdateList !== undefined) {
      onUpdateList(data);
    }
  };

  function dragStartHandler(e: React.DragEvent<HTMLDivElement>, list: IList) {
    console.log(`drag`, list)
  }

  function dragOverHandler(e: React.DragEvent<HTMLDivElement>, list: IList) {
    e.preventDefault();
    console.log(`drag`, list)
  }

  function dropHandler(e: React.DragEvent<HTMLDivElement>, list: IList) {
    e.preventDefault();
    console.log(`drag`, list)
  }

  return (
    <div>
      <Card
        onDragStart={(e) => dragStartHandler(e, list)}
        onDragLeave={(e) => dragStartHandler(e, list)}
        onDragEnd={(e) => dragStartHandler(e, list)}
        onDragOver={(e) => dragOverHandler(e, list)}
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

/* 
  return (
    <div>
      <Card className={styles.list}>
        <Title title={props.list.attributes.name} listId={props.list.id}></Title>
        {props.list.attributes.allTasks
        .map((task: TaskInterface) => (<Task key={task.id} task={task} listId={props.list.id}/>))}
        <InputContainer type='task' listId={props.list.id}/>
=======
*/
