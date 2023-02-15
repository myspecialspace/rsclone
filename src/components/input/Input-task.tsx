import { useState } from 'react';
import { Input, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { BoardContent } from '../Constants/constant';
import styles from './Input.module.scss';

const { TextArea } = Input;

interface InputTaskProps {
  setOpen : React.Dispatch<React.SetStateAction<boolean>>,
  type: string,
  listId: number,
}


export default function InputTask(props: InputTaskProps) {
  const [taskName, setTaskName] = useState('');
  const handleOnChange = (e: React.ChangeEvent) => {
    console.log((e.target as HTMLTextAreaElement).value)
    setTaskName((e.target as HTMLTextAreaElement).value);
  };

  const addMoreTask = (name: string, id: number) => {
    console.log(name);
  }

  const id = props.listId;
  const handleButtonConfirm = () => {
    addMoreTask(taskName, id);
    /* props.setOpen(false)} */
  }

  return (
    <div>
      <div className={props.type === 'task' ? styles.task : styles.list}>
        <TextArea
          onChange={handleOnChange}
          value={taskName}
          placeholder={props.type === 'task' ? BoardContent.INPUT_TITLE : BoardContent.INPUT_LIST_NAME}
          onBlur={() => props.setOpen(false)}
          autoSize={{ minRows: 2, maxRows: 6 }}
        />
      </div>
      <div className={styles.buttons__container}>
      <Button className={styles.button} type="primary" onClick={handleButtonConfirm} >
        {props.type === 'task' ? BoardContent.ADD_TASK : BoardContent.ADD_LIST}
      </Button>
      <Button className={styles.button} icon={<CloseOutlined />} onClick={() => props.setOpen(false)} ></Button>
      </div>
    </div>
  )
}
