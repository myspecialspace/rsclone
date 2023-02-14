import React, { useState } from 'react';
import { Typography } from "antd";
import { Input } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import styles from './Title.module.scss';
interface TitleProps {
  title: string;
}

export default function Title(props: TitleProps) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      {open ? (
        <div>
          <Input className={styles.change}
            autoFocus
            placeholder="title"
            value={props.title}
            onBlur={() => setOpen(!open)}/>
        </div>
      ) : (
        <div className={styles.container}>
          <Typography onClick={() => setOpen(!open)} className={styles.list__title}>{props.title}</Typography>
          <MoreOutlined className={styles.more}/>
        </div>
      )} 
    </div>
  );
}