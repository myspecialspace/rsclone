import { useState } from 'react';
import { Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { BoardContent } from '../Constants/constant';
import InputData, { InputDataType, SubmitData } from './Input-data';
import styles from './Input.module.scss';
import { List } from '../../types/list';


interface InputContainerProps {
  type: `${InputDataType}`;
  list?: List;
  onCreateTask?: (data: SubmitData) => any;
  onCreateList?: (data: SubmitData) => any;
}


export default function InputContainer({ type, list, onCreateTask, onCreateList }: InputContainerProps) {
  const [open, setOpen] = useState(false);

  const onSubmit = (data: SubmitData) => {
    if (type === "task" && onCreateTask !== undefined) {
      onCreateTask(data);
    } else if (onCreateList !== undefined) {
      onCreateList(data);
    }

    setOpen(false);
  };

  return (
    <div>
      {open ? (
        <div>
          <InputData type={type} list={list} onSubmit={onSubmit} onCancel={() => setOpen(false)} />
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