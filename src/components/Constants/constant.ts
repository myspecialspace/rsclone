enum MainPageContentRu {
  TITLE = 'Trello помогает собрать всех сотрудников, задачи и инструменты в одном месте',
  TEXT = 'Объедините все в одном месте, даже если участники вашей команды рассеяны по миру.',
  SIGN_UP_BUTTON = 'Зарегистрируйтесь - это бессплатно!',
  LOG_IN_BUTTON = 'Вход',
  LEN_BUTTON = 'Русский',
  CHANGE_LEN = 'Английский',
}

export enum LoginPageContentRu {
  LOGIN_TITLE = 'Вход в Trello',
  INPUT_EMAIL = 'Укажите адрес электронной почты',
  INPUT_PASSWORD = 'Введите пароль',
  LOGIN = 'Войти',
  HAVE_ACCOUNT = 'Не удается войти?',
  REGISTER = 'Зарегистрировать аккаунт',
}

export enum SignUpPageContentRu {
  SIGN_UP_TITLE = 'Регистрация аккаунта',
  INPUT_NAME = 'Укажите ваше имя',
  INPUT_EMAIL = 'Укажите адрес электронной почты',
  INPUT_PASSWORD = 'Введите пароль',
  SIGN_UP = 'Продолжить',
  HAVE_ACCOUNT = 'Уже есть аккаунт?',
  LOGIN = 'Войти',
}

enum MenuContentRu {
  MENU_TITLE = ' Workspace',
  MENU_ITEM_BOARDS = '  Доски',
  MENU_ITEM_MEMBERS = 'Участники',
  MENU_ITEM_SETTINGS = 'Настройки',
  SETTING = 'Настройки рабочего пространства',
  MENU_SUBTITLE = 'Мои доски',
}

enum WorkspaceContentRu {
  BOARDS_TITLE = 'Доски',
}

enum BoardContentRu {
  ADD_TASK = 'Добавить карточку',
  INPUT_TITLE = 'Ввести заголовок для этой карточки',
}

enum BoardContentEn {
  ADD_TASK = 'Add a card',
  INPUT_TITLE = '',
}

console.log(BoardContentEn);

export const mainPageContent = MainPageContentRu;
export const MenuContent = MenuContentRu;
export const WorkspaceName = MenuContentRu.MENU_TITLE;
export const WorkspaceContent = WorkspaceContentRu;
export const BoardContent = BoardContentRu;
