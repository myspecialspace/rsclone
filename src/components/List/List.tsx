import { Card } from 'antd';
import Title from './Title';
import styles from './List.module.scss';
import Task from '../Task/Task';
import InputContainer from '../input/Input-container';
/*
import ListInterface from '../../components/Interfaces/List-interface';
import TaskInterface from '../../components/Interfaces/Task-interface';
*/
import { List as IList } from '../../store/lists/types';
import { Task as ITask } from '../../store/tasks/types';
import { SubmitData } from '../input/Input-task';


interface ListProps {
  list: IList;
  tasks: ITask[];
  onCreateTask: (data: SubmitData) => any;
}


export default function List({ list, tasks, onCreateTask }: ListProps) {
  return (
    <div>
      <Card className={styles.list}>
        <Title title={list.name} listId={list.id}></Title>
        {tasks.map((task) => (<Task key={task.id} task={task} listId={list.id} />))}
        <InputContainer type='task' listId={list.id} onCreateTask={onCreateTask} />
      </Card>
    </div>
  )
}

/* 
<<<<<<< HEAD
export default function List(props: ListProps) {
  // console.log(props.list.attributes.name)
  // console.log(props.list.attributes.allTasks[0].id)
  return (
    <div>
      <Card className={styles.list}>
        <Title title={props.list.attributes.name} listId={props.list.id}></Title>
        {props.list.attributes.allTasks
        .map((task: TaskInterface) => (<Task key={task.id} task={task} listId={props.list.id}/>))}
        <InputContainer type='task' listId={props.list.id}/>
=======
*/
