import React, { useState } from 'react';
import { Typography } from "antd";
import { Input } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import styles from './Title.module.scss';
import api from '../../api/index';
interface TitleProps {
  title: string;
  listId: number;
}

export default function Title(props: TitleProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(props.title);

  const handleOnChange = (e: React.ChangeEvent) => {
    setName((e.target as HTMLInputElement).value);
  }

  const updateListTitle = (listTitle: string) => {
    api.updateList({data: { name: listTitle}})
  }

  const handleOnBlur = () => {
    updateListTitle(name);
    setOpen(!open);
  }

  return (
    <div>
      {open ? (
        <div>
          <Input className={styles.change}
            onChange={handleOnChange}
            autoFocus
            placeholder="title"
            value={name}
            onBlur={handleOnBlur}/>
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