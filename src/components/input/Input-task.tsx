import { useState } from 'react';
import { Input, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { BoardContent } from '../Constants/constant';
import styles from './Input.module.scss';
import api from '../../api/index';

// import TaskPostInterface from '../Interfaces/Task-post-interface';

const { TextArea } = Input;

interface InputTaskProps {
  setOpen : React.Dispatch<React.SetStateAction<boolean>>,
  type: string,
  listId: number,
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

  const boardId = 1;
  const listOrder = 0;

  const handleButtonConfirm = () => {
    if (props.type === 'task') {
      AddMoreTask(name, id);
    } else {
      AddMoreList(name, listOrder, boardId);
    }
    props.setOpen(false);
  }

 return (
    <div>
      <div className={props.type === 'task' ? styles.task : styles.list}>
        <TextArea
          onChange={handleOnChange}
          value={name}
          placeholder={props.type === 'task' ? BoardContent.INPUT_TITLE : BoardContent.INPUT_LIST_NAME}
          onBlur={() => props.setOpen(false)}
          autoSize={{ minRows: 2, maxRows: 6 }}
        />
      </div>
      <div className={styles.buttons__container}>
      <Button className={props.type === 'task' ? styles.button : styles.button_list} type="primary" onMouseDown={handleButtonConfirm} >
        {props.type === 'task' ? BoardContent.ADD_TASK : BoardContent.ADD_LIST}
      </Button>
      <Button className={styles.button} icon={<CloseOutlined />} onClick={() => props.setOpen(false)} ></Button>
      </div>
    </div>
  )
}
