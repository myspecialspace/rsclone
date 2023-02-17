import { Menu, MenuProps } from 'antd';
import { AppstoreOutlined, UsergroupAddOutlined, SettingOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import styles from './WorkspaceNav.module.scss';
import { MenuContent } from '../Constants/constant';


interface WorkspaceNavProps {
  className: string;
}
type MenuItem = Required<MenuProps>['items'][number];


export function WorkspaceNav({ className }: WorkspaceNavProps) {


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

    getItem(MenuContent.MENU_ITEM_BOARDS, '13', <AppstoreOutlined />),
    getItem(MenuContent.MENU_ITEM_MEMBERS, '14', <UsergroupAddOutlined />),
    getItem(MenuContent.MENU_ITEM_SETTINGS, '15', <SettingOutlined />),

    getItem(MenuContent.MENU_VIEWS, 'workspace-views', null, [
      getItem(MenuContent.TABLE_VIEW, 'view-table'),
      getItem(MenuContent.CALENDAR_VIEW, 'view-calendar'),
    ]),

    getItem(MenuContent.MENU_SUBTITLE, 'your-boards', null, [
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
    <div className={classNames(styles.root, className)} id="menu__container">
      <div className={styles.header}>
        <h4 className={styles.title}>{MenuContent.MENU_TITLE}</h4>
        <div  onClick={onShowButtonClick}><LeftOutlined className={styles.show_ico}/></div>
      </div>
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

export function MenuShowButton() {
  return (
    <div onClick={onHideButtonClick} className={styles.ico_hidden}><RightOutlined className={styles.show_ico}/></div>
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