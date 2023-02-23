import { useState } from 'react';
import { StarOutlined, LockOutlined, SettingOutlined } from '@ant-design/icons';
import styles from './BoardsHeader.module.scss';
import {
  Button,
  MenuProps,
  Menu,
  Avatar,
  Tooltip,
  Input,
  Space,
  Dropdown,
  Modal,
  Form,
  Checkbox,
} from 'antd';
import Member from '../../pages/Workspace/Member';
import { AppState, useAppDispatch } from '../../store';
import { useSelector } from 'react-redux';
import { BoardHeaderContent } from '../Constants/constant';
import { DeleteBoard } from '../../store/board/types';
import { useBoard } from '../../store/board/hooks';
import * as boardThunks from '../../store/board/thunks';
import { useNavigate } from 'react-router-dom';
import * as routerPaths from '../../router/paths';

const BoardsHeader: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [boardNew, setBoardNew] = useState('');
  console.log(boardNew);
  const dispatch = useAppDispatch();
  //   const userId = useSelector((state: AppState) => state.auth.userId);
  const $board = useBoard();
  const navigate = useNavigate();
  const userBoard = useSelector((state: AppState) => state.board.board || []);
  //   console.log(userBoard);

  const boardHeaderItems: MenuProps['items'] = [
    {
      label: `${BoardHeaderContent.BOARD_TITLE}${userBoard.name}`,
      key: 'board',
      //   icon: <EditOutlined />,
    },
    {
      //   label: 'Favorite boards',
      label: userBoard.isFavorite,
      key: 'favorite',
      icon: <StarOutlined />,
    },
    {
      label: userBoard.isPrivate,
      //   label: 'Private',
      icon: <LockOutlined />,
      key: 'private',
    },
  ];

  const upDateBoard = () => {
    console.log('open setting');
  };
  const onDeleteBoard = async (boardId: DeleteBoard) => {
    await dispatch(boardThunks.deleteBoard(boardId));
    $board.refetch();
  };
  const deleteBoard = () => {
    onDeleteBoard({ boardId: userBoard.id });
    navigate(routerPaths.workspaces(userBoard.workspace.id));
  };
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Button onClick={() => setIsModalOpen(true)}>
          {BoardHeaderContent.BOARD_SETTING}
        </Button>
      ),
    },
    {
      key: '2',
      label: <Button>{BoardHeaderContent.BOARD_INVITE}</Button>,
    },
    {
      key: '3',
      label: (
        <Button onClick={deleteBoard}>
          {BoardHeaderContent.DELETE_BOARD_NAME}
        </Button>
      ),
    },
  ];
  const onFinish = (data: any) => {
    console.log('Success:', data);
  };
  const handleInput = (e: React.ChangeEvent) => {
    if ((e.target as HTMLTextAreaElement).value.length !== 0) {
      setBoardNew((e.target as HTMLTextAreaElement).value);
    }
  };
  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    console.log(checked);
  };
  return (
    <>
      <div className={styles.inner}>
        <Menu
          style={{
            borderBottom: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '250px',
            borderRadius: '10px',
          }}
          mode='horizontal'
          items={boardHeaderItems}
        />
        <Space>
          <Dropdown menu={{ items }}>
            <Space>
              <SettingOutlined />
            </Space>
          </Dropdown>
          <Avatar.Group
            maxCount={2}
            maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
          >
            {userBoard.members.map((member) => (
              <Tooltip
                key={member.id}
                title={BoardHeaderContent.MEMBERS_TITLE}
                placement='top'
              >
                <Member member={member} />
              </Tooltip>
            ))}
          </Avatar.Group>
        </Space>
        <Modal
          title={BoardHeaderContent.UPDATE_BOARD_SETTING}
          open={isModalOpen}
          //   onOk={upDateBoard}
          onCancel={() => setIsModalOpen(false)}
          okText={BoardHeaderContent.BUTTON_OK}
          cancelText={BoardHeaderContent.BUTTON_NO}
        >
          <Form name='boardUpdate' onFinish={onFinish}>
            <Form.Item label={BoardHeaderContent.BOARD_TITLE} name='boardName'>
              <Input
                placeholder={BoardHeaderContent.UPDATE_BOARD_NAME}
                //   onChange={(e) => setBoardNew(e.target.value)}
                onChange={handleInput}
              />
            </Form.Item>
            <Space>
              <Form.Item
                name='favorite'
                valuePropName='checked'
                wrapperCol={{ offset: 8, span: 16 }}
              >
                <Checkbox>{BoardHeaderContent.CHECK_FAVORITE}</Checkbox>
              </Form.Item>
              <Form.Item
                name='private'
                valuePropName='checked'
                wrapperCol={{ offset: 8, span: 16 }}
              >
                <Checkbox>{BoardHeaderContent.CHECK_PRIVATE}</Checkbox>
              </Form.Item>
              <Form.Item
                name='close'
                valuePropName='checked'
                wrapperCol={{ offset: 8, span: 16 }}
              >
                <Checkbox>{BoardHeaderContent.CHECK_CLOSE}</Checkbox>
              </Form.Item>
            </Space>
          </Form>
        </Modal>
      </div>
    </>
  );
};
export default BoardsHeader;
