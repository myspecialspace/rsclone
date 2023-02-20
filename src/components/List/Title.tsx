import React, { useState } from 'react';
import { Typography, Input } from "antd";
import { MoreOutlined } from '@ant-design/icons';
import styles from './Title.module.scss';
import { List } from '../../types/list';
interface TitleProps {
  title: string;
  list: List;
  listId: number;
  onSubmitUpdate: (data: UpdateData) => any;
}
export interface UpdateData {
  listId: number;
  patch: {
    name: string;
    order: number;
  }
}

export function Title(props: TitleProps) {
  const [open, setOpen] = useState(false);
  const [listName, setListName] = useState(props.title);

  const handleOnChange = (e: React.ChangeEvent) => {
    setListName((e.target as HTMLInputElement).value);
    console.log("new title", listName)
  }

  const handleOnBlur = () => {
    console.log("list id", props.listId)
    props.onSubmitUpdate({ listId: props.listId, patch: { name: listName, order: props.list.order}});
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
            value={listName}
            onBlur={handleOnBlur} />
        </div>
      ) : (
        <div className={styles.container}>
          <Typography onClick={() => setOpen(!open)} className={styles.list__title}>{props.title}</Typography>
          <MoreOutlined className={styles.more} />
        </div>
      )}
    </div>
  );
}