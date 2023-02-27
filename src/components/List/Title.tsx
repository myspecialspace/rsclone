import React, { useState } from 'react';
import { Typography, Input, Dropdown, Button, MenuProps } from 'antd';
import { MoreOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from './Title.module.scss';
import { List } from '../../types/list';
import { BoardContent } from '../Constants/constant';
import { deleteList } from './types';
interface TitleProps {
  title: string;
  list: List;
  listId: number;
  onSubmitUpdate: (data: UpdateData) => any;
  onDeleteList: (data: deleteList) => any;
}
export interface UpdateData {
  listId: number;
  name: string;
  order: number;
}

export function Title(props: TitleProps) {
  const [open, setOpen] = useState(false);
  const [listName, setListName] = useState(props.title);

  const handleOnChange = (e: React.ChangeEvent) => {
    setListName((e.target as HTMLInputElement).value);
  };
  const listDelete = () => {
    props.onDeleteList({ listId: props.listId });
  };
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Button onClick={listDelete} danger>
          <DeleteOutlined />
          {BoardContent.DELETE_LIST}
        </Button>
      ),
    },
  ];
  const handleOnBlur = () => {
    props.onSubmitUpdate({
      listId: props.listId,
      name: listName,
      order: props.list.order,
    });
    setOpen(!open);
  };

  return (
    <div>
      {open ? (
        <div>
          <Input
            className={styles.change}
            onChange={handleOnChange}
            autoFocus
            placeholder='title'
            value={listName}
            onBlur={handleOnBlur}
          />
        </div>
      ) : (
        <div className={styles.container}>
          <Typography
            onClick={() => setOpen(!open)}
            className={styles.list__title}
          >
            {props.title}
          </Typography>
          <Dropdown menu={{ items }}>
            <MoreOutlined className={styles.more} />
          </Dropdown>
        </div>
      )}
    </div>
  );
}
