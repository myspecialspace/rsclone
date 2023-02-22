import Card from 'antd/es/card/Card';
import styles from './Task.module.scss';
import { Task as ITask } from '../../types/task';
import { Button, Typography, Modal, Input } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useState } from 'react';
import TextArea from 'antd/es/input/TextArea';

interface TaskProps {
  task: ITask;
  listId: number;
}

export default function Task({ task }: TaskProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskBgColor, setTaskBgColor] = useState('#ffffff');
  const [taskName, setTaskName] = useState(task.name);

  const handleOnChange = (e: React.ChangeEvent) => {
    setTaskName((e.target as HTMLInputElement).value);
    console.log('task name', taskName)
  }

  return (
    <div>
      <Card
        /*onDragStart={(e) => dragStartHandler(e, task)}
        onDragLeave={(e) => dragEndHandler(e)}
        onDragEnd={(e) => dragEndHandler(e)}
        onDragOver={(e) => dragOverHandler(e)}
        onDrop={(e) => dropHandler(e, task)}*/
        draggable={true}
        className={styles.task}>
        <div className={styles.task__content}>
          <Typography className={styles.title}>{task.name}</Typography>
          <Button className={styles.button_edit} icon={<EditOutlined className={styles.ico} onClick={() => setIsModalOpen(true)}/>}></Button>
        </div>
      </Card>
      <Modal open={isModalOpen} /*onOk={onCreate}*/ onCancel={() => setIsModalOpen(false)}>
      <Input className={styles.change}
            onChange={handleOnChange}
            autoFocus
            placeholder="card title"
            value={taskName}
            //onBlur={handleOnBlur}
             />
        <div>Описание</div>
        <TextArea
          placeholder="Добавить более подробное описание"
          value=""
          autoSize
          autoFocus
          /*onChange={(e) => setDescription(e.target.value)}*/
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