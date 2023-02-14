import React, { useState } from 'react';
import { Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { BoardContent } from '../Constants/constant';
import InputTask from './Input-task';
import styles from './Input.module.scss';



export default function InputContainer() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      {open ? (
      <div>
        <InputTask setOpen={setOpen} />
      </div>
      ) : (
      <div >
        <Card className={styles.container} size="small" onClick={()=> setOpen(!open)}>
          <div><PlusOutlined  className={styles.ico}/>{BoardContent.ADD_TASK}</div>
        </Card>
      </div>
      )}
    </div>
  )
}