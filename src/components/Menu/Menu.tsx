
import React from 'react';
import { UserOutlined,  SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import TrelloIconComponent from '../Constants/Trello-icon-component';
import { MenuContent } from '../Constants/constant';
import styles from './Menu.module.scss';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
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

const items: MenuItem[] = [
  getItem(MenuContent.MENU_ITEM_BOARDS, '1', <TrelloIconComponent /> ),

  getItem(MenuContent.MENU_ITEM_MEMBERS, '2', <UserOutlined />),

  getItem(MenuContent.MENU_ITEM_SETTINGS, '3', <SettingOutlined/>, [
    getItem(MenuContent.SETTING, '4'),
    getItem(' ', '5'),
  ]),
  getItem(MenuContent.MENU_SUBTITLE, '6')
];

const onClick: MenuProps['onClick'] = (e) => {
  console.log('click', e);
};

const App: React.FC = () => (
  <Menu onClick={onClick} style={{ width: 256 }} mode="vertical" items={items} />
);

function MenuContainer() {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>{MenuContent.MENU_TITLE}</h4>
      <div className={styles.item_ico}></div>
      <App />
    </div>
  )
}

export default MenuContainer;
