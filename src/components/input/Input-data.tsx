import { useState } from 'react';
import { Input, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { BoardContent } from '../Constants/constant';
import styles from './Input.module.scss';
import { List } from '../../types/list';

const { TextArea } = Input;

export enum InputDataType {
  TASK = 'task',
  LIST = 'list',
}

export interface SubmitData {
  name: string;
  list: List;
}

interface InputDataProps {
  type: `${InputDataType}`;
  list?: List;

  onSubmit: (data: SubmitData) => any;
  onCancel: () => any;
}


export default function InputData({ list, type, onSubmit, onCancel }: InputDataProps) {
  const [name, setName] = useState('');

  const handleOnChange = (e: React.ChangeEvent) => {
    if ((e.target as HTMLTextAreaElement).value.length !== 0) {
      setName((e.target as HTMLTextAreaElement).value);
    } 
  };

  const handleButtonConfirm = () => {
      onSubmit({ name, list: list! });
  };

  return (
    <div>
      <div className={type === InputDataType.TASK ? styles.task : styles.list}>
        <TextArea
          /*
                    placeholder={props.type === 'task' ? BoardContent.INPUT_TITLE : BoardContent.INPUT_LIST_NAME}
                    onBlur={() => props.setOpen(false)}
          */
          onChange={handleOnChange}
          onBlur={onCancel}
          value={name}
          placeholder={type === InputDataType.TASK ? BoardContent.INPUT_TITLE : BoardContent.INPUT_LIST_NAME}
          autoSize={{ minRows: 2, maxRows: 6 }}
          autoFocus
        />
      </div>
      <div className={styles.buttons__container}>
        <Button className={type === InputDataType.TASK ? styles.button : styles.button_list} type="primary" onMouseDown={() => handleButtonConfirm()} >
          {type === InputDataType.TASK ? BoardContent.ADD_TASK : BoardContent.ADD_LIST}
        </Button>
        <Button className={styles.button} icon={<CloseOutlined />} onClick={onCancel} ></Button>
      </div>
    </div>
  )
}

/*
<<<<<<< HEAD
      <Button className={props.type === 'task' ? styles.button : styles.button_list} type="primary" onMouseDown={handleButtonConfirm} >
        {props.type === 'task' ? BoardContent.ADD_TASK : BoardContent.ADD_LIST}
      </Button>
      <Button className={styles.button} icon={<CloseOutlined />} onClick={() => props.setOpen(false)} ></Button>
=======
 */
