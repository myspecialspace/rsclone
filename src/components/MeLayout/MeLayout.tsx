import { Button, Dropdown, MenuProps } from 'antd';
import { DownOutlined, TeamOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Outlet } from 'react-router-dom';
import styles from './MeLayout.module.scss';
import WorkspaceNav from '../WorkspaceNav/WorkspaceNav';
import { useSelector } from 'react-redux';
import { AppState, useAppDispatch } from '../../store';
import { authActions } from '../../store/auth';
import { useEffect } from 'react';
import { useWorkspaces } from '../../store/workspaces/thunks';
import { useBoards } from '../../store/boards/thunks';

export default function MeLayout() {
  const user = useSelector((state: AppState) => state.auth.user);
  const dispatch = useAppDispatch();
  const workspaces = useWorkspaces();
  const boards = useBoards();
  console.log('user', user);
  console.log('workspaces', workspaces);
  console.log('boards', boards);


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

  console.log('dispatch set user');


  useEffect(() => {
    dispatch(authActions.setUser({
      user: {
        "id": 3,
        "username": "heelo2",
        "email": "test2@test.com",
        "provider": "local",
        "confirmed": true,
        "blocked": false,
        "createdAt": "2023-02-08T18:17:54.286Z",
        "updatedAt": "2023-02-08T18:17:54.286Z",
        "backgroundColor": '#fc0',
        "theme": 'system',
      },
      jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjc2MTk4MDM3LCJleHAiOjE2Nzg3OTAwMzd9.9drJBGZ2Cvq0kpeWAX5tK4hcPd6rgzkXSI8XB7Kdecc',
    }));
  }, [dispatch]);

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
        <Outlet />
      </div>
    </div >
  )
}