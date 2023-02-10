
import React from 'react';
import { UserOutlined,  SettingOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { MenuProps } from 'antd';
import { Menu } from 'antd';
import TrelloIconComponent from '../Constants/Trello-icon-component';
import { MenuContent } from '../Constants/constant';
import'./Menu.scss';

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

export function MenuContainer() {
  return (
    <div className="container" id="menu__container">
      <div className="header">
        <h4 className="title">{MenuContent.MENU_TITLE}</h4>
        <div  onClick={onShowButtonClick}><LeftOutlined className="show_ico"/></div> 
      </div>
      <div className="item_ico"></div>
      <App />
    </div>
  )
}

export function MenuShowButton() {
  return (
    <div onClick={onHideButtonClick} className="ico-hidden"><RightOutlined className="show_ico"/></div>
  )
}



const onShowButtonClick = () => {
  const menu = document.getElementById('menu__container') as HTMLElement;
  menu.classList.add('hidden');
};

const onHideButtonClick = () => {
  const menu = document.getElementById('menu__container') as HTMLElement;
  menu.classList.remove('hidden');
};



