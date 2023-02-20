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
import { useBoard } from '../../store/board/hooks';

const BoardsHeader: React.FC = () => {
  const [current, setCurrent] = useState('board');
  const userId = useSelector((state: AppState) => state.auth.userId);
  const $board = useBoard();
  const board = $board.data;
  console.log(board);

  const userMembers = board.members || [];
  //   const userMembers = useSelector(
  //     (state: AppState) => state.board.board.members || []
  //   );
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    console.log(userId);
    setCurrent(e.key);
  };
  const boardHeaderItems: MenuProps['items'] = [
    {
      label: board.name,
      key: 'board',
      icon: <EditOutlined />,
    },
    {
      //   label: 'Featured boards',
      label: board.isFavorite,
      key: 'featured',
      icon: <StarOutlined />,
    },
    {
      label: 'Visibility ',
      key: 'Visibility',
      children: [
        {
          label: board.isClosed,
          //   label: 'Private',
          icon: <LockOutlined />,
          key: 'Private',
        },
        {
          label: board.isClosed,
          //   label: 'Public',
          icon: <UnlockOutlined />,
          key: 'Public',
        },
      ],
    },
  ];

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
                items={boardHeaderItems}
                // theme='dark'
              />
              <Avatar.Group
                maxCount={2}
                maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
              >
                {userMembers.map((member) => (
                  <Tooltip
                    key={member.id}
                    title={WorkspaceContent.MEMBERS_TITLE}
                    placement='top'
                  >
                    <Member member={member} />
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
