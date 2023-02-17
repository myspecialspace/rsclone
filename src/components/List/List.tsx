import { Card } from 'antd';
import Title from './Title';
import styles from './List.module.scss';
import Task from '../Task/Task';
import InputContainer from '../input/Input-container';
import ListInterface from '../../components/Interfaces/List-interface';
import TaskInterface from '../../components/Interfaces/Task-interface';

interface ListProps {
  list : ListInterface;  //дополнить тип данных в List
}

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
      </Card>
    </div>
  )
}
