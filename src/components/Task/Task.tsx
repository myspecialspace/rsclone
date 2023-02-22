import Card from 'antd/es/card/Card';
import styles from './Task.module.scss';
import { Task as ITask } from '../../types/task';
import { Button, Typography, Modal } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import { useAppDispatch } from '../../store';
import { useBoard } from '../../store/board/hooks';
import * as taskThunks from '../../store/tasks/thunks';

interface TaskProps {
  task: ITask;
  listId: number;
}

export default function Task({ task }: TaskProps) {
  const dispatch = useAppDispatch();
  const $board = useBoard();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskBgColor, setTaskBgColor] = useState(task.backgroundColor);
  const [taskName, setTaskName] = useState(task.name);
  const [description, setDescription] = useState(task.description);

  const handleOnChange = (e: React.ChangeEvent) => {
    setTaskName((e.target as HTMLInputElement).value);
    console.log('task name', taskName)
  }

  const onUpdateTask = async () => {
    console.log(' update task ', { taskName, description, taskBgColor });

    await dispatch(
      taskThunks.editTask({
        taskId: task.id,
        name: taskName,
        description: description,
        backgroundColor: taskBgColor,
    }));

    $board.refetch();
    setIsModalOpen(false);
  };


  return (
    <div>
      <Card
        /*onDragStart={(e) => dragStartHandler(e, task)}
        onDragLeave={(e) => dragEndHandler(e)}
        onDragEnd={(e) => dragEndHandler(e)}
        onDragOver={(e) => dragOverHandler(e)}
        onDrop={(e) => dropHandler(e, task)}*/
        draggable={true}
        className={styles.task}
        style={{ backgroundColor: task.backgroundColor}}>
        <div className={styles.task__content}>
          <Typography className={styles.title}>{task.name}</Typography>
          <Button className={styles.button_edit} style={{ backgroundColor: task.backgroundColor}} icon={<EditOutlined className={styles.ico} onClick={() => setIsModalOpen(true)}/>}></Button>
        </div>
      </Card>
      <Modal open={isModalOpen} onOk={onUpdateTask} onCancel={() => setIsModalOpen(false)}>
      <TextArea className={styles.change}
            onChange={handleOnChange}
            autoFocus
            autoSize
            placeholder="card title"
            value={taskName}
            //onBlur={handleOnBlur}
             />
        <div>Описание</div>
        <TextArea
          placeholder="Добавить более подробное описание"
          value={description}
          autoSize
          autoFocus
          onChange={(e) => setDescription(e.target.value)}
        />
        <div>Выбрать цвет обложки</div>
        <input type="color" value={taskBgColor} onChange={(e) => setTaskBgColor(e.target.value)} />
        <div>Оставить комментарий</div>
        <TextArea
          placeholder="Напишите комментарий ..."
          value=""
          autoSize={{ minRows: 2}}
          autoFocus
          /*onChange={(e) => setComment(e.target.value)}*/
        />
        <Button type="text" danger>Delete task</Button>
      </Modal>
    </div>
  )
}