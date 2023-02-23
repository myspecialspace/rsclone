enum MainPageContentRu {
  TITLE = 'Trello помогает собрать всех сотрудников, задачи и инструменты в одном месте',
  TEXT = 'Объедините все в одном месте, даже если участники вашей команды рассеяны по миру.',
  SIGN_UP_BUTTON = 'Зарегистрируйтесь - это бессплатно!',
  LOG_IN_BUTTON = 'Вход',
  LEN_BUTTON = 'Русский',
  CHANGE_LEN = 'Английский',
}

enum MainPageContentEn {
  TITLE = 'Trello brings all your tasks, teammates, and tools together',
  TEXT = 'Keep everything in the same place—even if your team isn’t.',
  SIGN_UP_BUTTON = 'Sign up - it’s free!',
  LOG_IN_BUTTON = 'Log in',
  LEN_BUTTON = 'Russian',
  CHANGE_LEN = 'English',
}

export enum LoginPageContentRu {
  LOGIN_TITLE = 'Вход в Trello',
  INPUT_EMAIL = 'Укажите адрес электронной почты',
  INPUT_PASSWORD = 'Введите пароль',
  LOGIN = 'Войти',
  HAVE_ACCOUNT = 'Не удается войти?',
  REGISTER = 'Зарегистрировать аккаунт',
}

enum LoginPageContentEN {
  LOGIN_TITLE = 'Log in to your account',
  INPUT_EMAIL = 'Input E-mail',
  FORGOT = 'Forgot Your Password?',
  LOGIN = 'Sign In',
  HAVE_ACCOUNT = 'Don’t have an account?',
  REGISTER = 'Register',
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

export enum SignUpPageContentEn {
  SIGN_UP_TITLE = 'Sign up for your account',
  INPUT_NAME = 'Enter your name',
  INPUT_EMAIL = 'Enter email',
  INPUT_PASSWORD = 'Enter password',
  SIGN_UP = 'Continue',
  HAVE_ACCOUNT = 'Already have an account?',
  LOGIN = 'Log in',
}

enum MenuContentRu {
  MENU_TITLE = 'Рабочее пространство',
  MENU_ITEM_BOARDS = '  Доски',
  MENU_ITEM_MEMBERS = 'Участники',
  MENU_ITEM_SETTINGS = 'Настройки',
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
  WORKSPACE_INVITE = 'Пригласить в воркспейс',
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

enum MeSettingsContentRu {
  SETTINGS_ME = 'Настройки',
  LOGOUT_ME = 'Выйти',
  SETTINGS_SAVED = 'Настройки сохранены.',
  SETTINGS_ERROR = 'Произошла ошибка.',
  NAME = 'Имя',
  COLOUR = 'Цвет',
  THEME = 'Тема',
  SAVE = 'Сохранить',
}

enum MeSettingsContentEn {
  SETTINGS_ME = 'Settings',
  LOGOUT_ME = 'Exit',
  SETTINGS_SAVED = 'Settings have been saved.',
  SETTINGS_ERROR = 'An error has occurred.',
  NAME = 'Name',
  COLOUR = 'Colour',
  THEME = 'theme',
  SAVE = 'Save',
}

enum BoardContentRu {
  ADD_TASK = 'Добавить карточку',
  ADD_LIST = 'Добавить список',
  ADD_LIST_TEXT = 'Добавьте еще одну колонку',
  INPUT_TITLE = 'Ввести заголовок для этой карточки',
  INPUT_LIST_NAME = 'Ввести заголовок списка',
}

enum BoardContentEn {
  ADD_TASK = 'Add a card',
  ADD_LIST = 'Add a list',
  ADD_LIST_TEXT = 'Add a list',
  INPUT_TITLE = 'Enter a title of this card',
  INPUT_LIST_NAME = 'Enter a title of this list',
}
enum BoardHeaderContentRu {
  UPDATE_BOARD_NAME = 'Изменить название доски',
  BOARD_SETTING = 'Настройки доски',
  UPDATE_BOARD_SETTING = 'Настройки',
  BOARD_TITLE = 'Доска:  ',
  BOARD_INVITE = 'Пригласить участников',
  DELETE_BOARD_NAME = 'Удалить доску',
  MEMBERS_TITLE = 'Пользователи',
  BUTTON_OK = 'Сохранить',
  BUTTON_NO = 'Отмена',
  CHECK_FAVORITE = 'избранная',
  CHECK_PRIVATE = 'личная',
  CHECK_CLOSE = 'закрыть',
  BOARD_DESCRIPTION = 'Описание: ',
}
enum BoardHeaderContentEn {
  UPDATE_BOARD_NAME = 'Settings name Board ',
  BOARD_SETTING = 'Settings Board',
  UPDATE_BOARD_SETTING = 'Settings',
  BOARD_TITLE = 'Board: ',
  BOARD_INVITE = 'Invite Board members',
  DELETE_BOARD_NAME = 'Delete Board',
  MEMBERS_TITLE = 'Members',
  BUTTON_OK = 'Save',
  BUTTON_NO = 'Cancel',
  CHECK_FAVORITE = 'favorite',
  CHECK_PRIVATE = 'private',
  CHECK_CLOSE = 'close board',
  BOARD_DESCRIPTION = 'description: ',
}
console.log(
  BoardContentEn,
  MenuContentEn,
  WorkspaceContentEn,
  LoginPageContentEN,
  MainPageContentEn,
  SignUpPageContentEn,
  MeSettingsContentEn,
  BoardHeaderContentEn
);

export const mainPageContent = MainPageContentRu;
export const MenuContent = MenuContentRu;
export const WorkspaceName = MenuContentRu.MENU_TITLE;
export const WorkspaceContent = WorkspaceContentRu;
export const BoardContent = BoardContentRu;
export const MeSettingsContent = MeSettingsContentRu;
export const BoardHeaderContent = BoardHeaderContentRu;
