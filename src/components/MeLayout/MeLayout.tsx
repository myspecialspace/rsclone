import {
  Button,
  Checkbox,
  Dropdown,
  Input,
  MenuProps,
  Modal,
  Space,
} from 'antd';
import {
  DownOutlined,
  TeamOutlined,
  AppstoreOutlined,
  SettingOutlined,
  PoweroffOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import styles from './MeLayout.module.scss';
import { WorkspaceNav } from '../WorkspaceNav/WorkspaceNav';
import { useSelector } from 'react-redux';
import { AppState, useAppDispatch } from '../../store';
import {
  authActions,
  getJWTFromStorage,
  getUserIdFromStorage,
} from '../../store/auth';
import { useWorkspaces } from '../../store/workspaces/hooks';
import * as routerPaths from '../../router/paths';
import { useEffect, useState } from 'react';
import { WORKSPACE_BG_COLOR, BOARD_BG_COLOR } from '../../helpers/defaults';
import { fetchWorkspacesCreate } from '../../store/workspaces/thunks';
import {
  MeSettingsContent,
  WorkspaceContent,
} from '../../components/Constants/constant';
import { Workspace } from '../../store/workspaces/types';
import {
  useCurrentWorkspace,
  useCurrentWorkspaceId,
  useWorkspace,
} from '../../store/workspace/hooks';
import { useUser } from '../../store/auth/hooks';
import { getBgColor, getFirstChar } from '../../helpers/user';
import { MenuInfo } from 'rc-menu/lib/interface';
import { UserItemKey } from './types';
import { workspaceActions } from '../../store/workspace';
import classNames from 'classnames';
import { fetchCreateBoard } from '../../store/workspace/thunks';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
export default function MeLayout() {
  const $user = useUser();
  const userId = useSelector((state: AppState) => state.auth.userId);
  const workspaceId = useCurrentWorkspaceId();
  const $workspaces = useWorkspaces();
  const workspaces = $workspaces.data;
  const currentWorkspace = useCurrentWorkspace();
  const $workspace = useWorkspace();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalsOpen, setIsModalsOpen] = useState(false);
  const [workspaceName, setWorkspaceName] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [workspaceBgColor, setWorkspaceBgColor] = useState(WORKSPACE_BG_COLOR);
  const [boardBgColor, setBoardBgColor] = useState(BOARD_BG_COLOR);
  const [boardNew, setBoardNew] = useState({
    name: '',
    description: '',
    isFavorite: false,
    isPrivate: false,
    isClosed: false,
  });
  useEffect(() => {
    const userId = getUserIdFromStorage();
    const jwt = getJWTFromStorage();

    if (userId && jwt) {
      dispatch(authActions.setAuth({ userId, jwt }));
    } else {
      console.log('no token in storage!! redirect');
      navigate(routerPaths.login());
    }
  }, [dispatch, navigate]);

  const user = $user.data;
  const userChar = getFirstChar(user);
  const userColor = getBgColor(user);

  const getWorkspaceItem = (workspace: Workspace, keyPrefix: string) => {
    const label = (
      <Link to={routerPaths.workspaces(workspace.id)}>{workspace.name}</Link>
    );

    return {
      label,
      key: keyPrefix + workspace.id,
    };
  };
  //for dropdown menu items => current & all workspaces
  const workspaceItems: MenuProps['items'] = [
    {
      type: 'group',
      key: 'current',
      label: WorkspaceContent.WORKSPACE_CURRENT,
      children: [
        currentWorkspace ? getWorkspaceItem(currentWorkspace, 'current') : null,
      ],
    },
    {
      type: 'group',
      key: 'workspaces',
      label: WorkspaceContent.WORKSPACE_TITLES,
      children: workspaces.map((workspace) =>
        getWorkspaceItem(workspace, 'workspace')
      ),
    },
  ];

  //обработчик
  const onWorkspaceClick = () => { };

  const createItems: MenuProps['items'] = [
    {
      label: (
        <Button
          type='ghost'
          rel='noopener noreferrer'
          onClick={() => setIsModalsOpen(true)}
        >
          {WorkspaceContent.BOARD_CREATE}
        </Button>
      ),
      key: 'board',
      icon: <AppstoreOutlined />,
    },
    {
      label: (
        <Button
          type='ghost'
          rel='noopener noreferrer'
          onClick={() => setIsModalOpen(true)}
        >
          {WorkspaceContent.WORKSPACE_CREATE}
        </Button>
      ),
      key: 'workspace',
      icon: <TeamOutlined />,
    },
  ];

  const onCreateClick = () => { };

  const onCreateWorkspace = async () => {
    // console.log(' create workspace', { workspaceName, workspaceBgColor });
    await dispatch(
      fetchWorkspacesCreate({
        owner: userId,
        members: [userId],
        backgroundColor: workspaceBgColor,
        name: workspaceName,
      })
    );

    $workspaces.refetch();
    setIsModalOpen(false);
  };

  const userItems: MenuProps['items'] = [
    {
      label: (
        <Link to={routerPaths.meSettings()}>
          {MeSettingsContent.SETTINGS_ME}
        </Link>
      ),
      key: UserItemKey.SETTINGS,
      icon: <SettingOutlined />,
    },
    {
      label: MeSettingsContent.LOGOUT_ME,
      key: UserItemKey.LOGOUT,
      icon: <PoweroffOutlined />,
    },
  ];

  const onUserItemClick = (data: MenuInfo) => {
    if (data.key === UserItemKey.LOGOUT) {
      dispatch(authActions.logout());
      dispatch(workspaceActions.resetCurrentId());
      navigate(routerPaths.login());
      return;
    }
  };
  const onCreateBoard = async () => {
    await dispatch(
      fetchCreateBoard({
        name: boardNew.name,
        backgroundColor: boardBgColor,
        workspace: workspaceId,
        members: [userId],
        owner: userId,
        description: boardNew.description,
        isFavorite: boardNew.isFavorite,
        isPrivate: boardNew.isPrivate,
        isClosed: boardNew.isClosed,
      })
    );
    setIsModalsOpen(false);
    setBoardNew({
      name: '',
      description: '',
      isClosed: false,
      isPrivate: false,
      isFavorite: false,
    });
    setBoardBgColor('');
    $workspace.refetch();
  };
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
    <div className={styles.root}>
      <header className={styles.header}>
        <Link
          to={routerPaths.workspaceBoards(workspaceId)}
          className={styles.logoLink}
        >
          <div className={styles.logo}></div>
          <div className={styles.name}>Trello</div>
        </Link>

        <Dropdown
          className={styles.workspaceSelector}
          menu={{ items: workspaceItems, onClick: onWorkspaceClick }}
        >
          <Button ghost>
            {WorkspaceContent.WORKSPACE_TITLES}
            <DownOutlined />
          </Button>
        </Dropdown>

        <Dropdown
          className={styles.createSelector}
          menu={{ items: createItems, onClick: onCreateClick }}
        >
          <Button ghost>{WorkspaceContent.CREATE}</Button>
        </Dropdown>
        <div className={styles.right}>
          <Dropdown
            className={styles.workspaceSelector}
            menu={{ items: userItems, onClick: (e) => onUserItemClick(e) }}
          >
            <Button
              type='primary'
              shape='circle'
              style={{ backgroundColor: userColor }}
            >
              {userChar}
            </Button>
          </Dropdown>
        </div>
      </header>

      <div className={classNames(styles.wrapper__layout, { [styles.sidebarHidden]: !isSidebarOpen })}>
        <WorkspaceNav className={styles.sidebar} isSidebarOpen={isSidebarOpen} />

        <div className={styles.rightside}>
          <Outlet />
        </div>
        <div
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={classNames(styles.sidebarButton)}
        >
          <RightOutlined className={styles.show_ico} />
        </div>
      </div>
      <Modal
        title={WorkspaceContent.WORKSPACE_CREATE}
        open={isModalOpen}
        onOk={onCreateWorkspace}
        onCancel={() => setIsModalOpen(false)}
      >
        <Input
          placeholder={WorkspaceContent.WORKSPACE_NAME}
          value={workspaceName}
          onChange={(e) => setWorkspaceName(e.target.value)}
        />
        <div>{WorkspaceContent.WORKSPACE_COLOR}</div>
        <input
          type='color'
          value={workspaceBgColor}
          onChange={(e) => setWorkspaceBgColor(e.target.value)}
        />
      </Modal>
      <Modal
        title={WorkspaceContent.BOARD_CREATE}
        open={isModalsOpen}
        onOk={onCreateBoard}
        onCancel={() => setIsModalsOpen(false)}
      >
        <Input
          placeholder={WorkspaceContent.BOARD_NAME}
          value={boardNew.name}
          name='name'
          onChange={handleInput}
          style={{ marginTop: 10, marginBottom: 10 }}
        />
        <div>{WorkspaceContent.BOARD_COLOR}</div>
        <input
          type='color'
          value={boardBgColor}
          onChange={(e) => setBoardBgColor(e.target.value)}
          style={{ marginTop: 5 }}
        />
        <Input
          placeholder={WorkspaceContent.WORKSPASE_DESCRIPTION}
          onChange={handleInput}
          name='description'
          value={boardNew.description}
          style={{ marginTop: 10 }}
        />
        <Space style={{ marginTop: 10 }}>
          <Checkbox onChange={handleFavorite} name='isFavorite'>
            {WorkspaceContent.CHECK_FAVORITE}
          </Checkbox>
          <Checkbox onChange={handlePrivate} name='isPrivate'>
            {WorkspaceContent.CHECK_PRIVATE}
          </Checkbox>
          <Checkbox onChange={handleClosed} name='isClose'>
            {WorkspaceContent.CHECK_CLOSE}
          </Checkbox>
        </Space>
      </Modal>
    </div>
  );
}
