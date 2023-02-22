import Card from 'antd/es/card/Card';
import styles from './Task.module.scss';
import { Task as ITask } from '../../types/task';
import { Button, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';

interface TaskProps {
  task: ITask;
  listId: number;
}

export default function Task({ task }: TaskProps) {
  return (
    <div>
      <Card className={styles.task}>
        <div className={styles.task__content}>
          <Typography className={styles.title}>{task.name}</Typography>
          <Button className={styles.button_edit} icon={<EditOutlined className={styles.ico}/>}></Button>
        </div>
      </Card>
    </div>
  )
}