import TaskInterface from './Task-interface';

export interface ListInterface {
    id: number;
    attributes: {
        name: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        description: null;
        order: null;
        allTasks: Array<TaskInterface>;
  }
} 
