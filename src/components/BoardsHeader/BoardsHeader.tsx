import { useState } from 'react';
import {
  StarOutlined,
  LockOutlined,
  SettingOutlined,
  UnlockOutlined,
} from '@ant-design/icons';
import styles from './BoardsHeader.module.scss';
import {
  Button,
  MenuProps,
  Avatar,
  Tooltip,
  Input,
  Space,
  Dropdown,
  Modal,
  Form,
  Checkbox,
} from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import Member from '../../pages/Workspace/Member';
import { AppState, useAppDispatch } from '../../store';
import { useSelector } from 'react-redux';
import { BoardHeaderContent } from '../Constants/constant';
import { DeleteBoard, UpdateData } from '../../store/board/types';
import { useBoard } from '../../store/board/hooks';
import * as boardThunks from '../../store/board/thunks';
import { useNavigate, useParams } from 'react-router-dom';
import * as routerPaths from '../../router/paths';

const BoardsHeader: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const id = useParams();
  const boardId = Number(id.boardId);
  const userBoard = useSelector((state: AppState) => state.board.board || []);
  const [boardNew, setBoardNew] = useState({
    boardId: boardId,
    name: userBoard.name,
    description: '',
    isFavorite: false,
    isPrivate: false,
    isClosed: false,
  });

  const dispatch = useAppDispatch();
  const $board = useBoard();
  const navigate = useNavigate();
  const onUpDateBoard = async (data: UpdateData) => {
    await dispatch(
      boardThunks.updateBoard({
        name: data.name,
        boardId: boardId,
        description: boardNew.description,
        isClosed: boardNew.isClosed,
        isFavorite: boardNew.isFavorite,
        isPrivate: boardNew.isPrivate,
      })
    );
    $board.refetch();
  };
  const upDateBoard = () => {
    onUpDateBoard(boardNew);
    setIsModalOpen(false);
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

  const handleInput = (e: React.ChangeEvent) => {
    const { name, value } = e.target as HTMLTextAreaElement;
    setBoardNew({ ...boardNew, [name]: value });
  };
  const handleFavorite = (e: CheckboxChangeEvent) => {
    setBoardNew({ ...boardNew, isFavorite: e.target.checked });
  };
  const handlePrivate = (e: CheckboxChangeEvent) => {
    setBoardNew({ ...boardNew, isPrivate: e.target.checked });
  };

  const handleClosed = (e: CheckboxChangeEvent) => {
    setBoardNew({ ...boardNew, isClosed: e.target.checked });
  };
  return (
    <>
      <div className={styles.inner}>
        <div className={styles.menu}>
          <ul className={styles.list}>
            <li className={styles.item}>
              <span className={styles.text}>
                {BoardHeaderContent.BOARD_TITLE}
              </span>
              <span>{userBoard.name}</span>
            </li>
            <li className={styles.item}>
              {userBoard.isFavorite ? (
                <StarOutlined style={{ color: '#FFB02E' }} />
              ) : (
                <StarOutlined style={{ color: 'inherit' }} />
              )}
            </li>
            <li className={styles.item}>
              {userBoard.isPrivate ? (
                <LockOutlined style={{ color: '#FFB02E' }} />
              ) : (
                <UnlockOutlined />
              )}
            </li>
          </ul>
          <Space>
            <Dropdown menu={{ items }}>
              <SettingOutlined style={{ fontSize: '22px' }} />
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
        </div>
        {userBoard.description !== null && userBoard.description !== '' ? (
          <div className={styles.description}>
            <span className={styles.text}>
              {BoardHeaderContent.BOARD_DESCRIPTION}
            </span>
            <span>{userBoard.description}</span>
          </div>
        ) : (
          <></>
        )}
        <Modal
          title={BoardHeaderContent.UPDATE_BOARD_SETTING}
          open={isModalOpen}
          onOk={upDateBoard}
          onCancel={() => setIsModalOpen(false)}
          okText={BoardHeaderContent.BUTTON_OK}
          cancelText={BoardHeaderContent.BUTTON_NO}
        >
          <Form name='boardUpdate'>
            <Form.Item label={BoardHeaderContent.BOARD_TITLE} name='name'>
              <Input
                placeholder={BoardHeaderContent.UPDATE_BOARD_NAME}
                onChange={handleInput}
                name='name'
                value={boardNew.name}
              />
            </Form.Item>
            <Form.Item
              label={BoardHeaderContent.BOARD_DESCRIPTION}
              name='description'
            >
              <Input
                placeholder={BoardHeaderContent.BOARD_DESCRIPTION}
                onChange={handleInput}
                name='description'
                value={boardNew.description}
              />
            </Form.Item>
            <Space>
              <Form.Item
                name='isFavorite'
                valuePropName='checked'
                wrapperCol={{ offset: 8, span: 16 }}
              >
                <Checkbox onChange={handleFavorite}>
                  {BoardHeaderContent.CHECK_FAVORITE}
                </Checkbox>
              </Form.Item>
              <Form.Item
                name='isPrivate'
                valuePropName='checked'
                wrapperCol={{ offset: 8, span: 16 }}
              >
                <Checkbox onChange={handlePrivate}>
                  {BoardHeaderContent.CHECK_PRIVATE}
                </Checkbox>
              </Form.Item>
              <Form.Item
                name='close'
                valuePropName='checked'
                wrapperCol={{ offset: 8, span: 16 }}
              >
                <Checkbox onChange={handleClosed}>
                  {BoardHeaderContent.CHECK_CLOSE}
                </Checkbox>
              </Form.Item>
            </Space>
          </Form>
        </Modal>
      </div>
    </>
  );
};
export default BoardsHeader;
