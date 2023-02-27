import Card from 'antd/es/card/Card';
import styles from './Task.module.scss';
import { Task as ITask } from '../../types/task';
import { Button, Typography, Modal, Checkbox } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import { useAppDispatch, AppState } from '../../store';
import { useBoard } from '../../store/board/hooks';
import * as taskThunks from '../../store/tasks/thunks';
import { CardEdit } from '../Constants/constant';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import Comment from './Comment';
import * as commentsThunks from '../../store/comments/thunks';
import { useSelector } from 'react-redux';
import { useTasks } from '../../store/tasks/hooks';

interface TaskProps {
  task: ITask;
  listId: number;
}

export default function Task({ task }: TaskProps) {
  const dispatch = useAppDispatch();
  const boardId = useSelector((state: AppState) => state.board.id);
  const $board = useBoard();
  const $task = useTasks(boardId);
  const userId = useSelector((state: AppState) => state.auth.userId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskBgColor, setTaskBgColor] = useState(task.backgroundColor);
  const [taskName, setTaskName] = useState(task.name);
  const [description, setDescription] = useState(task.description);
  const [comment, setComment] = useState('');
  const [isCompleted, setIsCompleted] = useState(task.isCompleted);

  const handleOnChange = (e: React.ChangeEvent) => {
    setTaskName((e.target as HTMLInputElement).value);
    // console.log('task name', taskName)
  };

  const onUpdateTask = async () => {
    await dispatch(
      taskThunks.editTask({
        taskId: task.id,
        name: taskName,
        description: description,
        backgroundColor: taskBgColor,
        isCompleted: isCompleted,
      })
    );

    $board.refetch();
    setIsModalOpen(false);
  };

  const onTaskDelete = async () => {
    await dispatch(
      taskThunks.deleteTask({
        taskId: task.id,
      })
    );

    $board.refetch();
  };

  const onCommentCreate = async () => {
    await dispatch(
      commentsThunks.fetchCreate({
        task: task.id,
        content: comment,
        owner: userId,
      })
    );
    // console.log(comment, task.id)
    setIsModalOpen(true);
    $task.refetch();
  };

  const onCheckChange = (e: CheckboxChangeEvent) => {
    setIsCompleted(e.target.checked);
  };

  let date =
    task.createdAt.slice(0, 4) +
    '.' +
    task.createdAt.slice(5, 7) +
    '.' +
    task.createdAt.slice(8, 10);

  return (
    <div>
      <Card
        draggable={true}
        className={styles.task}
        style={{ backgroundColor: task.backgroundColor }}
      >
        <div className={styles.task__content}>
          <Typography className={styles.title}>{task.name}</Typography>
          <Button
            className={styles.button_edit}
            style={{ backgroundColor: task.backgroundColor }}
            icon={
              <EditOutlined
                className={styles.ico}
                onClick={() => setIsModalOpen(true)}
              />
            }
          ></Button>
        </div>
      </Card>
      <Modal
        open={isModalOpen}
        onOk={onUpdateTask}
        onCancel={() => setIsModalOpen(false)}
      >
        <TextArea
          className={styles.change}
          onChange={handleOnChange}
          autoFocus
          autoSize
          placeholder='card title'
          value={taskName}
        />
        <div className={styles.change__check}>
          <p className={styles.date}>
            {CardEdit.CREATE_DATA}: {date}
          </p>
          <Checkbox checked={isCompleted} onChange={onCheckChange}>
            {CardEdit.CHECKED}
          </Checkbox>
        </div>
        <div className={styles.change__title}>{CardEdit.DESCRIPTION}</div>
        <TextArea
          className={styles.description}
          placeholder={CardEdit.DESCRIPTION_PLACEHOLDER}
          value={description}
          autoSize
          autoFocus
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className={styles.change__title}>{CardEdit.COLOR}</div>
        <input
          className={styles.color}
          type='color'
          value={taskBgColor}
          onChange={(e) => setTaskBgColor(e.target.value)}
        />
        <div>
          <div className={styles.change__title}>{CardEdit.COMMENTS_TITLE}</div>
          <div>
            {task.comments.map((comment) => (
              <Comment key={comment.id} comment={comment} taskId={task.id} />
            ))}
          </div>
          <div className={styles.change__comment}>{CardEdit.COMMENT}</div>
          <TextArea
            className={styles.comment}
            placeholder={CardEdit.COMMENT_PLACEHOLDER}
            value={comment}
            autoSize={{ minRows: 2 }}
            autoFocus
            onChange={(e) => setComment(e.target.value)}
            onBlur={onCommentCreate}
          />
        </div>
        <p className={styles.change__title}>{CardEdit.DATE_TO_COMPLETE}</p>
        <Button type='text' danger onClick={onTaskDelete}>
          {CardEdit.DELETE}
        </Button>
      </Modal>
    </div>
  );
}
