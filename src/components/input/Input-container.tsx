import { useState } from 'react';
import { Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { BoardContent } from '../Constants/constant';
import InputTask, { InputTaskType, SubmitData } from './Input-task';
import styles from './Input.module.scss';


interface InputContainerProps {
  type: `${InputTaskType}`;
  listId?: number;
  onCreateTask: (data: SubmitData) => any;
}

export default function InputContainer({ type, listId, onCreateTask }: InputContainerProps) {
  const [open, setOpen] = useState(false);

  const onSubmit = (data: SubmitData) => {
    onCreateTask(data);
    setOpen(false);
  };

  return (
    <div>
      {open ? (
        <div>
          <InputTask type={type} listId={listId!} onSubmit={onSubmit} onCancel={() => setOpen(false)} />
        </div>
      ) : (
        <div >
          <Card className={type === 'task' ? styles.container : styles.container_list} size="small" onClick={() => setOpen(!open)}>
            <div>
              <PlusOutlined className={styles.ico} />
              {type === 'task' ? BoardContent.ADD_TASK : BoardContent.ADD_LIST_TEXT}
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}