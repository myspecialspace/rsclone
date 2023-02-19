import { useState } from 'react';
import {
  StarOutlined,
  EditOutlined,
  LockOutlined,
  UnlockOutlined,
} from '@ant-design/icons';
import styles from './BoardsHeader.module.scss';
import type { MenuProps } from 'antd';
import { Menu, Avatar, Tooltip } from 'antd';
import Member from '../../pages/Workspace/Member';
import { AppState } from '../../store';
import { useSelector } from 'react-redux';
import { WorkspaceContent } from '../Constants/constant';

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
  const id: string | null = localStorage.getItem('userId'); // TODO from state.auth.userId

  const userMembers = useSelector(
    (state: AppState) => state.board.board.members
  ) || [];
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
              // theme='dark'
              />
              <Avatar.Group
                maxCount={2}
                maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
              >
                {userMembers.map((member) => (
                  <Tooltip
                    title={WorkspaceContent.MEMBERS_TITLE}
                    placement='top'
                  >
                    <Member key={member.id} member={member} />{' '}
                  </Tooltip>
                ))}
              </Avatar.Group>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BoardsHeader;
