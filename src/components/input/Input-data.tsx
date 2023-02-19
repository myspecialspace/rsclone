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
  /*
  }
  
  
  export default function InputTask(props: InputTaskProps) {
    const [name, setName] = useState('');
    const handleOnChange = (e: React.ChangeEvent) => {
      setName((e.target as HTMLTextAreaElement).value);
    };
  
    const id = props.listId;
  
    const [task, setTask] = useState({data: {name: '', list: 0, order: 0}})
    const AddMoreTask = (name: string, id: number) => {
      //console.log(name, id);
      //task = {data: {name: name, list: id, order: 0 }}
      setTask({data: {name: name, list: id, order: 0}});
      console.log(task)
      api.postTask({data: {name: name, list: id, order: 0}});
    }
  
  
    const [list, setList] = useState({data: {name: '', description: '',  order: 0, board: 0,}});
  
    const AddMoreList = (name: string, order: number, board: number) => {
      //console.log(name, order, board);
      setList({data: {name: name, description: '', order: order, board: board}});
      console.log(list)
      api.postList({data: {name: name, description: '', order: order, board: board }});
    }
  */
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
    /*if (name.length === 0) {
      e.preventDefault();
    } else {*/
      onSubmit({ name, list: list! });
    //}
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
