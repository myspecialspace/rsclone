import { Menu, MenuProps } from 'antd';
import { AppstoreOutlined, UsergroupAddOutlined, SettingOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
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
}
type MenuItem = Required<MenuProps>['items'][number];

enum MenuKeys {
  VIEWS = 'menu-workspace-views',
  BOARDS = 'menu-workspace-boards',
  BOARD = 'menu-workspace-board',
}

const getBoardKey = (boardId: number | string) => MenuKeys.BOARD + '-' + boardId;

export function WorkspaceNav({ className }: WorkspaceNavProps) {
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

  return (
    <div className={classNames(styles.root, className)} id="menu__container">
      <div className={styles.header}>
        <h4 className={styles.title}>{MenuContent.MENU_TITLE}</h4>
        <div onClick={onShowButtonClick}><LeftOutlined className={styles.show_ico} /></div>
      </div>
      <Menu
        className={styles.menu}
        mode="inline"
        items={items}
        selectedKeys={[activeRouteId]}
        openKeys={openKeys}
        onOpenChange={setOpenKeys}
      />
    </div>
  )
}

export function MenuShowButton() {
  return (
    <div onClick={onHideButtonClick} className={styles.ico_hidden}><RightOutlined className={styles.show_ico} /></div>
  )
}

const onShowButtonClick = () => {
  const menu = document.getElementById('menu__container') as HTMLElement;
  menu.style.position='absolute';
  menu.style.transform='translateX(-266px)';
};

const onHideButtonClick = () => {
  const menu = document.getElementById('menu__container') as HTMLElement;
  menu.style.position='relative';
  menu.style.transform='translateX(0)';
};