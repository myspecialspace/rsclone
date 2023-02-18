import { Card } from 'antd';
import Title from './Title';
import styles from './List.module.scss';
import Task from '../Task/Task';
import InputContainer from '../input/Input-container';
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
        <Title title={list.name}></Title>
        {tasks.map((task) => (<Task key={task.id} task={task} listId={list.id} />))}
        <InputContainer type='task' listId={list.id} onCreateTask={onCreateTask} />
      </Card>
    </div>
  )
}
