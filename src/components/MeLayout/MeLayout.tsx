import { Button, Dropdown, MenuProps } from 'antd';
import { DownOutlined, TeamOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Outlet } from 'react-router-dom';
import styles from './MeLayout.module.scss';
import WorkspaceNav from '../WorkspaceNav/WorkspaceNav';



export default function MeLayout() {

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
      // children: workspaces.data.map((workspace) => ({
      //   label: workspace.name,
      //   key: workspace.id
      // })),
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
          {/* <Button type="primary" shape="circle" style={{ 'backgroundColor': userColor }}>{userChar}</Button> */}
          <Button type="primary" shape="circle" style={{ 'backgroundColor': 'fc0' }}>K</Button>
        </div>
      </header>
      <div className={styles.wrapper}>
        <WorkspaceNav className={styles.sidebar} />
        <Outlet />
      </div>
    </div >
  )
}