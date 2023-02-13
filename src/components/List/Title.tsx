import React, { useState } from 'react';
import { Typography } from "antd";
import { Input } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import styles from './Title.module.scss';

const title = "To do";

export default function Title() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      {open ? (
        <div>
          <Input className={styles.change} placeholder="title"  value={title}  onBlur={() => setOpen(!open)}/>
        </div>
      ) : (
        <div className={styles.container}>
          <Typography onClick={() => setOpen(!open)} className={styles.list__title}>{title}</Typography>
          <MoreOutlined className={styles.more}/>
        </div>
      )} 
    </div>
  );
}