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
// import { useBoard } from '../../store/board/hooks';
// import board from '../../store/board';

const BoardsHeader: React.FC = () => {
  const [current, setCurrent] = useState('board');
  const userId = useSelector((state: AppState) => state.auth.userId);
  //   const $board = useBoard();
  //   const board = $board.data;
  //   console.log(board);
  //   const userMembers = board.members || [];
  const userMembers = useSelector(
    (state: AppState) => state.board.board.members || []
  );
  const userBoard = useSelector((state: AppState) => state.board.board || []);
  console.log(userBoard);

  const boardHeaderItems: MenuProps['items'] = [
    {
      label: userBoard.name,
      key: 'board',
      icon: <EditOutlined />,
    },
    {
      //   label: 'Featured boards',
      label: userBoard.isFavorite,
      key: 'featured',
      icon: <StarOutlined />,
    },
    {
      label: 'Visibility ',
      key: 'Visibility',
      children: [
        {
          label: userBoard.isClosed,
          //   label: 'Private',
          icon: <LockOutlined />,
          key: 'private',
        },
        {
          //   label: board.isClosed,
          //   label: 'Public',
          icon: <UnlockOutlined />,
          key: 'public',
        },
      ],
    },
  ];
  const onClick: MenuProps['onClick'] = (e) => {
    // console.log('click ', e);
    if (e.key === 'board') {
      console.log(userBoard.name);
      onChangeBoard(userBoard.name);
    }
    if (e.key === 'featured') {
      console.log(userBoard.isFavorite);
    }
    if (e.key === 'private') {
      console.log(userBoard.isPrivate);
    }
    if (e.key === 'public') {
      console.log(userBoard.isPrivate);
    }
    console.log(userId);
    setCurrent(e.key);
  };

  const onChangeBoard = async (values: any) => {
    // const res = await dispatch(
    //   changeBoard({
    //     boardId: userBoard.id,
    //     patch: {
    //       name: values.name,
    //       isFavorite: values.isFavorite,
    //       isPrivate: values.isPrivate,
    //     },
    //   })
    // );
    console.log('onChangeBoard');

    // const { requestStatus } = res.meta;
    // if (requestStatus === RequestStatus.FULFILLED) {
    //   api.success({ message: MeSettingsContent.SETTINGS_SAVED });
    // }
    // if (requestStatus === RequestStatus.REJECTED) {
    //   api.error({ message: MeSettingsContent.SETTINGS_ERROR });
    // }
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
