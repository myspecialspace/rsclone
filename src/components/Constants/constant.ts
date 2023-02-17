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
  MENU_TITLE = 'Рабочее пространство',
  MENU_ITEM_BOARDS = '  Доски',
  MENU_ITEM_MEMBERS = 'Участники',
  MENU_ITEM_SETTINGS = 'Настройки',
  SETTING = 'Настройки рабочего пространства',
  MENU_SUBTITLE = 'Мои доски',
  MENU_VIEWS = 'Режимы просмотра рабочего пространства',
  TABLE_VIEW = 'Таблица',
  CALENDAR_VIEW = 'Календарь',
}

enum MenuContentEn {
  MENU_TITLE = 'Workspaces',
  MENU_ITEM_BOARDS = 'Boards',
  MENU_ITEM_MEMBERS = 'Members',
  MENU_ITEM_SETTINGS = 'Settings',
  //SETTING = 'Настройки рабочего пространства',
  MENU_SUBTITLE = 'Your boards',
  MENU_VIEWS = 'Workspace views',
  TABLE_VIEW = 'Table',
  CALENDAR_VIEW = 'Calendar',
}

enum WorkspaceContentRu {
  WORKSPACE_TITLE = 'Untitled',
  BOARDS_TITLE = 'Доски',
  MEMBERS_TITLE = 'Пользователи',
  BOARD_NAME = 'Название доски',
  BOARD_CREATE = 'Создать доску',
  BOARD_COLOR = 'Цвет доски',
  WORKSPACE_ERROR = 'Ошибка',
  WORKSPACE_INVITE = 'Пригласить участников рабочего пространства',
  CREATE = 'Создать',
  WORKSPACE_TITLES = 'Рабочие пространства',
  WORKSPACE_CURRENT = 'Текущее',
  WORKSPACE_CREATE = 'Создать рабочее пространство',
  WORKSPACE_NAME = 'Название рабочего пространства',
  WORKSPACE_COLOR = 'Цвет рабочего пространства',
}

enum WorkspaceContentEn {
  WORKSPACE_TITLE = 'Untitled',
  BOARDS_TITLE = 'Boards',
  MEMBERS_TITLE = 'Members',
  BOARD_NAME = 'Board Name',
  BOARD_CREATE = 'Create board',
  BOARD_COLOR = 'Board colour',
  WORKSPACE_ERROR = 'Error',
  WORKSPACE_INVITE = 'Invite Workspace members',
  CREATE = 'Create',
  WORKSPACE_TITLES = 'Workspaces',
  WORKSPACE_CURRENT = 'Current',
  WORKSPACE_CREATE = 'Create Workspace',
  WORKSPACE_NAME = 'Workspace Name',
  WORKSPACE_COLOR = 'Board colour',
}

enum BoardContentRu {
  ADD_TASK = 'Добавить карточку',
  ADD_LIST = 'Добавить список',
  ADD_LIST_TEXT = 'Добавьте еще одну колонку',
  INPUT_TITLE = 'Ввести заголовок для этой карточки',
  INPUT_LIST_NAME = 'Ввести заголовок списка'
}

enum BoardContentEn {
  ADD_TASK = 'Add a card',
  INPUT_TITLE = 'Enter a title of this card',
}

console.log(BoardContentEn, MenuContentEn, WorkspaceContentEn);

export const mainPageContent = MainPageContentRu;
export const MenuContent = MenuContentRu;
export const WorkspaceName = MenuContentRu.MENU_TITLE;
export const WorkspaceContent = WorkspaceContentRu;
export const BoardContent = BoardContentRu;
