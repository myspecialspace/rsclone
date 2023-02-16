import { useState } from 'react';
import { Input, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { BoardContent } from '../Constants/constant';
import styles from './Input.module.scss';
import Api from '../../api/index';

// import TaskPostInterface from '../Interfaces/Task-post-interface';

const { TextArea } = Input;

interface InputTaskProps {
  setOpen : React.Dispatch<React.SetStateAction<boolean>>,
  type: string,
  listId: number,
  //AddMoreTask(name: string, id: number): void;
}


export default function InputTask(props: InputTaskProps) {
  const [taskName, setTaskName] = useState('');
  const handleOnChange = (e: React.ChangeEvent) => {
    console.log((e.target as HTMLTextAreaElement).value)
    setTaskName((e.target as HTMLTextAreaElement).value);
  };

  const id = props.listId;


  const AddMoreTask = (name: string, id: number) => {
    const [task, setTask] = useState({data: {name: '', list: 0 /*order: 0,*/ }})
    console.log(name, id);

    setTask({data: {name: name, list: id /*order: 0,*/ }});
    Api.postTask(task);
    //Api.getListsAll();
  }



  const handleButtonConfirm = () => {
    if (props.type === 'task') {
      AddMoreTask(taskName, id);
    }
    props.setOpen(false)
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
      <Button className={props.type === 'task' ? styles.button : styles.button_list} type="primary" onClick={() => handleButtonConfirm} >
        {props.type === 'task' ? BoardContent.ADD_TASK : BoardContent.ADD_LIST}
      </Button>
      <Button className={styles.button} icon={<CloseOutlined />} onClick={() => props.setOpen(false)} ></Button>
      </div>
    </div>
  )
}
