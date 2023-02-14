import Card from 'antd/es/card/Card';
import styles from './Task.module.scss';
import TaskInterface from '../../components/Interfaces/Task-interface';

interface TaskProps {
  task : TaskInterface;
}

export default function Task(props: TaskProps) {
  return (
    <div>
      <Card className={styles.task}>
        {props.task.attributes.name}
      </Card>
    </div>
  )
}