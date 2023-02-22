import { useState } from 'react';
import {
  StarOutlined,
  EditOutlined,
  LockOutlined,
  SettingOutlined,
} from '@ant-design/icons';
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
import { BoardContent } from '../Constants/constant';
import { DeleteBoard, UpdateData } from '../../store/board/types';
import { useBoard } from '../../store/board/hooks';
import * as boardThunks from '../../store/board/thunks';
import { useNavigate } from 'react-router-dom';
import * as routerPaths from '../../router/paths';

const BoardsHeader: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [boardName, setBoardName] = useState('');
  const dispatch = useAppDispatch();
  //   const userId = useSelector((state: AppState) => state.auth.userId);
  const $board = useBoard();
  const navigate = useNavigate();
  const userBoard = useSelector((state: AppState) => state.board.board || []);
  //   console.log(userBoard);

  const boardHeaderItems: MenuProps['items'] = [
    {
      label: `${BoardContent.BOARD_TITLE}${userBoard.name}`,
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

  const onUpDateBoard = async (data: UpdateData) => {
    await dispatch(
      boardThunks.updateBoard({
        name: data.name,
        boardId: data.boardId,
        // description: '',
        // isClosed: false,
        isFavorite: true,
        isPrivate: true,
      })
    );
    $board.refetch();
  };
  const upDateBoard = () => {
    console.log('open setting');
    // onUpDateBoard({})
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
          {BoardContent.BOARD_SETTING}
        </Button>
      ),
    },

    {
      key: '2',
      label: (
        <Button onClick={deleteBoard}>{BoardContent.DELETE_BOARD_NAME}</Button>
      ),
    },
  ];
  const onFinish = (data: any) => {
    console.log('Success:', data);
  };
  return (
    <>
      <div className={styles.inner}>
        <Menu
          style={{
            minWidth: 'max-content',
            borderBottom: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '250px',
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
                title={BoardContent.MEMBERS_TITLE}
                placement='top'
              >
                <Member member={member} />
              </Tooltip>
            ))}
          </Avatar.Group>
        </Space>

        <Modal
          title={BoardContent.UPDATE_BOARD_SETTING}
          open={isModalOpen}
          onOk={upDateBoard}
          onCancel={() => setIsModalOpen(false)}
          okText='сохранить'
        >
          <Form name='boardUpdate' onFinish={onFinish}>
            <Form.Item label={BoardContent.BOARD_TITLE} name='boardName'>
              <Input
                placeholder={BoardContent.UPDATE_BOARD_NAME}
                onChange={(e) => setBoardName(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name='favorite'
              valuePropName='checked'
              wrapperCol={{ offset: 8, span: 16 }}
            >
              <Checkbox>Избранное</Checkbox>
            </Form.Item>
            <Form.Item
              name='private'
              valuePropName='checked'
              wrapperCol={{ offset: 8, span: 16 }}
            >
              <Checkbox>Закрытая</Checkbox>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};
export default BoardsHeader;
