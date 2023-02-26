export enum DropType {
  LIST = 'list',
  TASK = 'task',
}

export const getDroppableId = {
  board: (boardid: number) => `board-${boardid}`,
  list: (listId: number) => `list-${listId}`,
};

export const getDraggableId = {
  task: (taskId: number) => `task-${taskId}`,
};

export const parseDroppableId = (input: string): number => {
  const [, strId] = input.split('-');
  const id = parseInt(strId);
  return id;
};