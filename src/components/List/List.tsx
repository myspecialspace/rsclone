import { Card } from 'antd';
import Title from './Title';
import styles from './List.module.scss';
import Task from '../Task/Task';
import InputContainer from '../input/Input-container';
// import { ListInterface } from '../../components/Interfaces/List-interface';
import TaskInterface from '../../components/Interfaces/Task-interface';

/* interface ListProps {
  list : ListInterface;
} */


export default function List({list}: any) {  //указать тип данных
  console.log(list.attributes.name)
  console.log(list.attributes.allTasks[0].id)
  return (
    <div>
      <Card className={styles.list}>
        <Title title={list.attributes.name}></Title>
        {list.attributes.allTasks.map((task: TaskInterface) => (<Task key={task.id} task={task}/>))}
        <InputContainer />
      </Card>
    </div>
  )
}
