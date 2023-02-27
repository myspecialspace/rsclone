type UrlChunk = string | number | undefined;
const createUrl = (...chunks: UrlChunk[]): string => '/' + chunks.filter(Boolean).join('/');

export enum RoutePath {
  LOGIN = 'login',
  REGISTRATION = 'registration',
  ABOUT = 'about',
  ME = 'me',
  SETTINGS = 'settings',
  BOARDS = 'boards',
  WORKSPACES = 'workspaces',
  MEMBERS = 'members',
}

export const login = () => createUrl(RoutePath.LOGIN);
export const registration = () => createUrl(RoutePath.REGISTRATION);
export const boards = (id?: number) => createUrl(RoutePath.ME, RoutePath.BOARDS, id);
export const workspaces = (id?: number) => createUrl(RoutePath.ME, RoutePath.WORKSPACES, id);
export const meSettings = () => createUrl(RoutePath.ME, RoutePath.SETTINGS);
export const workspaceById = (id: number, ...paths: UrlChunk[]) => createUrl(RoutePath.ME, RoutePath.WORKSPACES, id, ...paths);
export const workspaceBoards = (id: number) => workspaceById(id, RoutePath.BOARDS);
export const workspaceBoard = (id: number, boardId: number) => workspaceById(id, RoutePath.BOARDS, boardId);
export const workspaceMembers = (id: number) => workspaceById(id, RoutePath.MEMBERS);
export const workspaceSettings = (id: number) => workspaceById(id, RoutePath.SETTINGS);
