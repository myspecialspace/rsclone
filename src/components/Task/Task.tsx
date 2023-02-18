import Card from 'antd/es/card/Card';
import styles from './Task.module.scss';
import { Task as ITask } from '../../store/tasks/types';

interface TaskProps {
  task: ITask;
  listId: number;
}

export default function Task({ task }: TaskProps) {
  return (
    <div>
      <Card className={styles.task}>
        {task.name}
      </Card>
    </div>
  )
}