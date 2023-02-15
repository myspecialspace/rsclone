import { Menu, MenuProps } from 'antd';
import { AppstoreOutlined, UsergroupAddOutlined, SettingOutlined, PieChartOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import styles from './WorkspaceNav.module.scss';


interface WorkspaceNavProps {
  className: string;
}
type MenuItem = Required<MenuProps>['items'][number];


export default function WorkspaceNav({ className }: WorkspaceNavProps) {


  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

  const items: MenuProps['items'] = [
    getItem('Workspaces', '12', <PieChartOutlined />),
    getItem('Boards', '13', <AppstoreOutlined />),
    getItem('Members', '14', <UsergroupAddOutlined />),
    getItem('Settings', '15', <SettingOutlined />),

    getItem('Workspace views', 'workspace-views', null, [
      getItem('Table', 'view-table'),
      getItem('Calendar', 'view-calendar'),
    ]),

    getItem('Your boards', 'your-boards', null, [
      getItem('Kate', 'board-1'),
      getItem('Programming', 'board-2'),
      getItem('Panthers', 'board-3'),
    ]),
  ];

  const onClick = (...args: []) => {
    console.log('args', args);
  };

  const onOpenChange = (...args: []) => {
    // TODO

  };

  return (
    <div className={classNames(styles.root, className)}>
      <Menu
        className={styles.menu}
        onClick={onClick}
        mode="inline"
        items={items}
        openKeys={['workspace-views', 'your-boards']}
        onOpenChange={onOpenChange}
      />
    </div>
  )
}