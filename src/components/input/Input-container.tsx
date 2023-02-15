import React, { useState } from 'react';
import { Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { BoardContent } from '../Constants/constant';
import InputTask from './Input-task';
import styles from './Input.module.scss';

interface InputContainerProps {
  type: string;
}

export default function InputContainer(props: InputContainerProps) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      {open ? (
      <div>
        <InputTask setOpen={setOpen} type={props.type}/>
      </div>
      ) : (
      <div >
        <Card className={styles.container} size="small" onClick={()=> setOpen(!open)}>
          <div><PlusOutlined  className={styles.ico}/>
            {props.type === 'task' ? BoardContent.ADD_TASK : BoardContent.ADD_LIST_TEXT}
          </div>
        </Card>
      </div>
      )}
    </div>
  )
}