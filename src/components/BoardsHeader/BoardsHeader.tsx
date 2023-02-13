import images from '../../assets/img/icon_user.webp';
import { useState } from 'react';
import {
  StarOutlined,
  EditOutlined,
  LockOutlined,
  UnlockOutlined,
  AntDesignOutlined,
  UserOutlined,
} from '@ant-design/icons';
import styles from './BoardsHeader.module.scss';
import type { MenuProps } from 'antd';
import { Menu, Avatar, Tooltip } from 'antd';

const items: MenuProps['items'] = [
  {
    label: 'Name Board',
    key: 'board',
    icon: <EditOutlined />,
  },
  {
    label: 'Featured boards',
    key: 'featured',
    icon: <StarOutlined />,
  },
  {
    label: 'Visibility ',
    key: 'Visibility',
    children: [
      {
        label: 'Private',
        icon: <LockOutlined />,
        key: 'Private',
      },
      {
        label: 'Public',
        icon: <UnlockOutlined />,
        key: 'Public',
      },
    ],
  },
];

const BoardsHeader: React.FC = () => {
  const [current, setCurrent] = useState('mail');
  const id: string | null = localStorage.getItem('userId');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    console.log(id);
    setCurrent(e.key);
  };

  return (
    <>
      <div className='boards-page__wrapper'>
        <div className='boards'>
          <div className='boards__content'>
            <div className={styles.wrapper}>
              <Menu
                onClick={onClick}
                selectedKeys={[current]}
                mode='horizontal'
                items={items}
                theme='dark'
              />
              <Avatar.Group
                maxCount={2}
                maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
              >
                <Avatar src={images} />
                <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
                <Tooltip title='Ant User' placement='top'>
                  <Avatar
                    style={{ backgroundColor: '#87d068' }}
                    icon={<UserOutlined />}
                  />
                </Tooltip>
                <Avatar
                  style={{ backgroundColor: '#1890ff' }}
                  icon={<AntDesignOutlined />}
                />
              </Avatar.Group>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BoardsHeader;
