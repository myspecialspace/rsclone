import { Button, Dropdown, Input, MenuProps, Modal } from 'antd';
import { DownOutlined, TeamOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import styles from './MeLayout.module.scss';
import { WorkspaceNav, MenuShowButton } from '../WorkspaceNav/WorkspaceNav';
import { useSelector } from 'react-redux';
import { AppState, useAppDispatch } from '../../store';
import { authActions, getJWTFromStorage, getUserIdFromStorage } from '../../store/auth';
import { useWorkspaces } from '../../store/workspaces/hooks';
import * as routerPaths from '../../router/paths';
import { useEffect, useState } from 'react';
import { WORKSPACE_BG_COLOR } from '../../helpers/defaults';
import { fetchWorkspacesCreate } from '../../store/workspaces/thunks';
import { WorkspaceContent } from '../../components/Constants/constant';
import { Workspace } from '../../store/workspaces/types';
import { useCurrentWorkspace } from '../../store/workspace/hooks';

export default function MeLayout() {
  const user = useSelector((state: AppState) => state.auth.user);
  const userId = useSelector((state: AppState) => state.auth.userId);
  const $workspaces = useWorkspaces();
  const workspaces = $workspaces.data;
  const currentWorkspace = useCurrentWorkspace();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workspaceName, setWorkspaceName] = useState('');
  const [workspaceBgColor, setWorkspaceBgColor] = useState(WORKSPACE_BG_COLOR);

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



  const userChar = user.username ? user.username[0].toUpperCase() : '';
  const userColor = user.backgroundColor || '#fff';

  const getWorkspaceItem = (workspace: Workspace) => {
    const label = <Link to={routerPaths.workspaces(workspace.id)}>{workspace.name}</Link>;

    return {
      label,
      key: workspace.id
    };
  };
  //for dropdown menu items => current & all workspaces
  const workspaceItems: MenuProps['items'] = [
    {
      type: 'group',
      key: 'current',
      label: WorkspaceContent.WORKSPACE_CURRENT,
      children: [
        currentWorkspace ? getWorkspaceItem(currentWorkspace) : null,
      ],
    },
    {
      type: 'group',
      key: 'workspaces',
      label: WorkspaceContent.WORKSPACE_TITLES,
      children: workspaces.map((workspace) => getWorkspaceItem(workspace)),
    },
  ];
  //обработчик
  const onWorkspaceClick = () => {

  };

  const createItems: MenuProps['items'] = [
    {
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://ant.design/">
          {WorkspaceContent.BOARD_CREATE}
        </a>
      ),
      key: 'board',
      icon: <AppstoreOutlined />,
    },
    {
      label: (
        <Button type="ghost" rel="noopener noreferrer" onClick={() => setIsModalOpen(true)}>
          {WorkspaceContent.WORKSPACE_CREATE}
        </Button>
      ),
      key: 'workspace',
      icon: <TeamOutlined />,
    },
  ];

  const onCreateClick = () => {
  };

  const onCreateWorkspace = async () => {
    console.log(' create workspace', { workspaceName, workspaceBgColor });

    await dispatch(fetchWorkspacesCreate({
      owner: userId,
      members: [userId],
      backgroundColor: workspaceBgColor,
      name: workspaceName,
    }));

    $workspaces.refetch();
    setIsModalOpen(false);
  }

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={styles.logo}></div>
        <div className={styles.name}>Trello</div>

        <Dropdown className={styles.workspaceSelector} menu={{ items: workspaceItems, onClick: onWorkspaceClick }}>
          <Button ghost>
            {WorkspaceContent.WORKSPACE_TITLES}
            <DownOutlined />
          </Button>
        </Dropdown>

        <Dropdown className={styles.createSelector} menu={{ items: createItems, onClick: onCreateClick }}>
          <Button ghost>
            {WorkspaceContent.CREATE}
          </Button>
        </Dropdown>
        <div className={styles.right}>
          <Button type="primary" shape="circle" style={{ 'backgroundColor': userColor }}>{userChar}</Button>
        </div>
      </header>
      <div className={styles.wrapper}>
        <WorkspaceNav className={styles.sidebar} />
        <div>
          <MenuShowButton />
          <Outlet />
        </div>
      </div>
      <Modal title={WorkspaceContent.WORKSPACE_CREATE} open={isModalOpen} onOk={onCreateWorkspace} onCancel={() => setIsModalOpen(false)}>
        <Input
          placeholder={WorkspaceContent.WORKSPACE_NAME}
          value={workspaceName}
          onChange={(e) => setWorkspaceName(e.target.value)}
        />
        <div>{WorkspaceContent.WORKSPACE_COLOR}</div>
        <input type="color" value={workspaceBgColor} onChange={(e) => setWorkspaceBgColor(e.target.value)} />
      </Modal>
    </div >
  )
}