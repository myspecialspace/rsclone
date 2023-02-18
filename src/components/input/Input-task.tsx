import { useState } from 'react';
import { Input, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { BoardContent } from '../Constants/constant';
import styles from './Input.module.scss';

const { TextArea } = Input;

export enum InputTaskType {
  TASK = 'task',
  LIST = 'list',
}

export interface SubmitData {
  taskName: string;
  listId: number;
}

interface InputTaskProps {
  type: `${InputTaskType}`;
  listId: number,
  onSubmit: (data: SubmitData) => any;
  onCancel: () => any;
}


export default function InputTask({ listId, type, onSubmit, onCancel }: InputTaskProps) {
  const [taskName, setTaskName] = useState('');

  const handleButtonConfirm = () => {
    console.log('handleButtonConfirm', taskName, listId);
    onSubmit({ taskName, listId });
  };

  return (
    <div>
      <div className={type === InputTaskType.TASK ? styles.task : styles.list}>
        <TextArea
          onChange={(e) => setTaskName(e.target.value)}
          value={taskName}
          placeholder={type === InputTaskType.TASK ? BoardContent.INPUT_TITLE : BoardContent.INPUT_LIST_NAME}
          autoSize={{ minRows: 2, maxRows: 6 }}
        />
      </div>
      <div className={styles.buttons__container}>
        <Button className={type === InputTaskType.TASK ? styles.button : styles.button_list} type="primary" onClick={() => handleButtonConfirm()} >
          {type === InputTaskType.TASK ? BoardContent.ADD_TASK : BoardContent.ADD_LIST}
          'test'
        </Button>
        <Button className={styles.button} icon={<CloseOutlined />} onClick={onCancel} ></Button>
      </div>
    </div>
  )
}
