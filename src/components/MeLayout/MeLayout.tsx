import { Button, Dropdown, MenuProps } from 'antd';
import { DownOutlined, TeamOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';
import styles from './MeLayout.module.scss';
import { WorkspaceNav, MenuShowButton } from '../WorkspaceNav/WorkspaceNav';
import { useSelector } from 'react-redux';
import { AppState, useAppDispatch } from '../../store';
import { authActions, getJWTFromStorage, getUserIdFromStorage } from '../../store/auth';
import { useWorkspaces } from '../../store/workspaces/hooks';
import * as routerPaths from '../../router/paths';
import { useEffect } from 'react';

export default function MeLayout() {
  const user = useSelector((state: AppState) => state.auth.user);
  const workspaces = useWorkspaces();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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

  //for dropdown menu items => current & all workspaces
  const workspaceItems: MenuProps['items'] = [
    {
      type: 'group',
      key: 'current',
      label: 'Current',
      children: [
        {
          label: 'Workspace 1',
          key: 'current 1',
        },
      ],
    },
    {
      type: 'group',
      key: 'workspaces',
      label: 'Workspaces',
      children: workspaces.data.map((workspace) => ({
        label: workspace.name,
        key: workspace.id
      })),
    },
  ];
  //обработчик
  const onWorkspaceClick = () => {

  };

  const createItems: MenuProps['items'] = [
    {
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://ant.design/">
          Create Board
        </a>
      ),
      key: 'board',
      icon: <AppstoreOutlined />,
    },
    {
      label: 'A board is made up of cards ordered on lists.',
      key: 'workspace',
      disabled: true,
    },
    {
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://ant.design/">
          Create Workspace
        </a>
      ),
      key: 'workspace',
      icon: <TeamOutlined />,
    },
    {
      label: 'A Workspace is a group of boards and people. Organize your company, family, or friends.',
      key: 'workspace',
      disabled: true,
    },
  ];

  const onCreateClick = () => {

  };

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={styles.logo}></div>
        <div className={styles.name}>Trello</div>

        <Dropdown className={styles.workspaceSelector} menu={{ items: workspaceItems, onClick: onWorkspaceClick }}>
          <Button ghost>
            Workspaces
            <DownOutlined />
          </Button>
        </Dropdown>

        <Dropdown className={styles.createSelector} menu={{ items: createItems, onClick: onCreateClick }}>
          <Button ghost>
            Create
          </Button>
        </Dropdown>
        <div className={styles.right}>
          <Button type="primary" shape="circle" style={{ 'backgroundColor': userColor }}>{userChar}</Button>
        </div>
      </header>
      <div className={styles.wrapper}>
        <WorkspaceNav className={styles.sidebar} />
        <div>
          <MenuShowButton/>
          <Outlet />
        </div>
      </div>
    </div >
  )
}