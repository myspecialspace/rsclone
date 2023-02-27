import styles from './Workspace.module.scss';
import { WorkspaceContent } from '../../components/Constants/constant';
import {
  StarOutlined,
  UserAddOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Button, Input, Modal, Space, Spin } from 'antd';
import { useWorkspace } from '../../store/workspace/hooks';
import { Link } from 'react-router-dom';
import Member from './Member';
import Board from './Board';
import { useState } from 'react';
import { useAppDispatch } from '../../store';
import { fetchCreateBoard } from '../../store/workspace/thunks';
import classNames from 'classnames';
import { BOARD_BG_COLOR } from '../../helpers/defaults';
import * as routerPaths from '../../router/paths';
import { useSelector } from 'react-redux';
import { authSelectors } from '../../store/auth/selectors';
import * as boardThunks from '../../store/board/thunks';
import { useBoard } from '../../store/board/hooks';
import { DeleteBoard } from '../../store/board/types';

export default function WorkspacePage() {
  const dispatch = useAppDispatch();
  const $workspace = useWorkspace();
  const workspace = $workspace.data;
  const $board = useBoard();
  const board = $board?.data || '';
  const boardId = board.id;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteBoard, setIsDeleteBoard] = useState(false);
  const [boardName, setBoardName] = useState('');
  const [boardBgColor, setBoardBgColor] = useState(BOARD_BG_COLOR);
  const userId = useSelector(authSelectors.userId);

  if ($workspace.isPending || $workspace.isInitial || !workspace) {
    return <Spin />;
  }

  if ($workspace.isError) {
    return <div>WorkspaceContent.WORKSPACE_ERROR</div>;
  }

  const onCreateBoard = async () => {
    await dispatch(
      fetchCreateBoard({
        name: boardName,
        backgroundColor: boardBgColor,
        workspace: workspace.id,
        members: [userId],
        owner: userId,
        description: '',
        isFavorite: false,
        isPrivate: false,
        isClosed: false,
      })
    );
    setIsModalOpen(false);
    $workspace.refetch();
  };
  const onClick = () => {
    setIsDeleteBoard(true);
  };
  const upDateBoard = () => {
    onDeleteBoard({ boardId });
    setIsDeleteBoard(false);
  };
  const onDeleteBoard = async (data: DeleteBoard) => {
    await dispatch(boardThunks.deleteBoard({ boardId }));
    $workspace.refetch();
  };
  return (
    <div className={styles.main}>
      <div className={styles.main__content}>
        <div className={styles.current__workspace}>
          <h2 className={styles.title}>
            #{workspace.id} {workspace.name}
            <span className={styles.itemstar}>
              {workspace.isFavorite ? (
                <StarOutlined style={{ color: '#FFB02E' }} />
              ) : (
                <StarOutlined style={{ color: 'inherit' }} />
              )}
            </span>
          </h2>
          <Space align='center'>
            <Button type='primary' icon={<UserAddOutlined />}>
              {WorkspaceContent.WORKSPACE_INVITE}
            </Button>
          </Space>
        </div>
        {workspace.description !== null && workspace.description !== '' ? (
          <div className={styles.description}>
            <span className={styles.text}>
              {WorkspaceContent.WORKSPASE_DESCRIPTION}
            </span>
            <span>{workspace.description}</span>
          </div>
        ) : (
          <></>
        )}
        <hr className='horizontal' />
        <div className={styles.block}>
          <h2 className={styles.title}>{WorkspaceContent.BOARDS_TITLE}</h2>
          <div className={styles.boards}>
            <div
              className={classNames(styles.board, styles.create)}
              onClick={() => setIsModalOpen(true)}
            >
              {WorkspaceContent.BOARD_CREATE}
            </div>
            {workspace.boards.map((board) => (
              <div className={styles.board_link} key={board.id}>
                <Link to={routerPaths.workspaceBoard(workspace.id, board.id)}>
                  <Board board={board} className={styles.board} />
                </Link>
                <button className={styles.delete} onClick={onClick}>
                  <DeleteOutlined />
                </button>
                <Modal
                  title={WorkspaceContent.DELETE_BOARD}
                  open={isDeleteBoard}
                  onOk={upDateBoard}
                  onCancel={() => setIsDeleteBoard(false)}
                  okText={WorkspaceContent.BUTTON_DELETE}
                  cancelText={WorkspaceContent.BUTTON_NO}
                ></Modal>
              </div>
            ))}
            <Modal
              title={WorkspaceContent.BOARD_CREATE}
              open={isModalOpen}
              onOk={onCreateBoard}
              onCancel={() => setIsModalOpen(false)}
            >
              <Input
                placeholder={WorkspaceContent.BOARD_NAME}
                value={boardName}
                onChange={(e) => setBoardName(e.target.value)}
              />
              <div>{WorkspaceContent.BOARD_COLOR}</div>
              <input
                type='color'
                value={boardBgColor}
                onChange={(e) => setBoardBgColor(e.target.value)}
              />
            </Modal>
          </div>
        </div>
        <div className={styles.block}>
          <h2 className={styles.title}>{WorkspaceContent.MEMBERS_TITLE}</h2>
          <div>
            {workspace.members.map((member) => (
              <Member key={member.id} member={member} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
