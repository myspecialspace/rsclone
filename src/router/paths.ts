const createUrl = (...chunks: (RoutePath | number | undefined)[]): string => '/' + chunks.filter(Boolean).join('/');

export enum RoutePath {
  LOGIN = 'login',
  REGISTRATION = 'registration',
  ABOUT = 'about',
  ME = 'me',
  SETTINGS = 'settings',
  BOARDS = 'boards',
  WORKSPACES = 'workspaces',
}

export const login = () => createUrl(RoutePath.LOGIN);
export const registration = () => createUrl(RoutePath.REGISTRATION);
export const boards = (id?: number) => createUrl(RoutePath.ME, RoutePath.BOARDS, id);
export const workspaces = (id?: number) => createUrl(RoutePath.ME, RoutePath.WORKSPACES, id);
export const meSettings = () => createUrl(RoutePath.ME, RoutePath.SETTINGS);
