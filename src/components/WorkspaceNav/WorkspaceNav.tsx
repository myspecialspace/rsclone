import { Menu, MenuProps, ConfigProvider } from 'antd';
import { AppstoreOutlined, UsergroupAddOutlined, SettingOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import styles from './WorkspaceNav.module.scss';
import { MenuContent } from '../Constants/constant';
import { Link, useMatches } from 'react-router-dom';
import { RouterId } from '../../router/ids';
import { useCurrentWorkspaceId, useWorkspace } from '../../store/workspace/hooks';
import * as routerPaths from '../../router/paths';
import { useState } from 'react';

interface WorkspaceNavProps {
  className: string;
  isSidebarOpen: boolean;
}
type MenuItem = Required<MenuProps>['items'][number];

enum MenuKeys {
  VIEWS = 'menu-workspace-views',
  BOARDS = 'menu-workspace-boards',
  BOARD = 'menu-workspace-board',
}

const getBoardKey = (boardId: number | string) => MenuKeys.BOARD + '-' + boardId;

export function WorkspaceNav({ className, isSidebarOpen }: WorkspaceNavProps) {
  const matches = useMatches();
  const workspaceId = useCurrentWorkspaceId();
  const $workspace = useWorkspace();
  const boards = $workspace.data?.boards || [];
  const [openKeys, setOpenKeys] = useState(Object.values(MenuKeys) as string[]);
  //console.log('matches', matches);
  const routeIdMatch = matches[matches.length - 1];
  const activeRouteId = routeIdMatch.id === RouterId.WORKSPACE_BOARD
    ? getBoardKey(routeIdMatch.params.id!)
    : routeIdMatch.id;

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

    getItem(
      <Link to={routerPaths.workspaceBoards(workspaceId)}>{MenuContent.MENU_ITEM_BOARDS}</Link>,
      RouterId.WORKSPACE_BOARDS,
      <AppstoreOutlined />
    ),
    getItem(
      <Link to={routerPaths.workspaceMembers(workspaceId)}>{MenuContent.MENU_ITEM_MEMBERS}</Link>,
      RouterId.WORKSPACE_MEMBERS,
      <UsergroupAddOutlined />
    ),
    getItem(
      <Link to={routerPaths.workspaceSettings(workspaceId)}>{MenuContent.MENU_ITEM_SETTINGS}</Link>,
      RouterId.WORKSPACE_SETTINGS,
      <SettingOutlined />
    ),

    getItem(MenuContent.MENU_VIEWS, MenuKeys.VIEWS, null, [
      getItem(MenuContent.TABLE_VIEW, 'view-table'),
      getItem(MenuContent.CALENDAR_VIEW, 'view-calendar'),
    ]),

    getItem(MenuContent.MENU_SUBTITLE, MenuKeys.BOARDS, null, boards.map((board) => {
      return getItem(
        <Link to={routerPaths.workspaceBoard(workspaceId, board.id)}>{board.name}</Link>,
        getBoardKey(board.id),
      )
    })),
  ];

  const menuStyles: React.CSSProperties = isSidebarOpen
    ? { position: 'relative', transform: 'translateX(0)' }
    : { position: 'absolute', transform: 'translateX(-266px)' };

  return (
    <div className={classNames(styles.root, className)} style={menuStyles}>
      <div className={styles.header}>
        <h4 className={styles.title}>{MenuContent.MENU_TITLE}</h4>
      </div>
      <ConfigProvider theme={{
        token: {
          colorBgBase: '#516270',
          colorText: '#fff',
        }
      }}>
        <Menu
          className={styles.menu}
          mode="inline"
          items={items}
          selectedKeys={[activeRouteId]}
          openKeys={openKeys}
          onOpenChange={setOpenKeys}
        />
      </ConfigProvider>
    </div>
  )
}