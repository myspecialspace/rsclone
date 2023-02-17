// const axios = require('axios').default;
import axios, { AxiosError } from 'axios';
import { getMappedResponse } from '../helpers/strapi';
import * as strapi from "../helpers/strapi-types";
import { Workspace } from '../store/workspaces/types';
import * as types from './types';
import TaskPostInterface from '../components/Interfaces/Task-post-interface';
import ListPostInterface from '../components/Interfaces/List-post-interface';

interface IUser {
  username: string;
  email: string;
  password: string;
  identifier: string;
}
export const API_URL = `http://localhost:1337/api/`;
const instance = axios.create({
  baseURL: API_URL,
});

const handleStrapiError = (error: AxiosError) => {
  throw error.response?.data;
};
class Api {
  setJwt(token: string) {
    instance.defaults.headers['Authorization'] = `Bearer ${token}`;
  }
  register(values: IUser) {
    return instance
      .post('auth/local/register', {
        username: values.username,
        email: values.email,
        password: values.password,
      })
      .then((data) => {
        // console.log(data.data.jwt);
        // console.log(data.data.user);
        return data.data;
      })
      .catch(handleStrapiError);
  }
  login(values: IUser) {
    return instance
      .post('auth/local', {
        identifier: values.identifier,
        password: values.password,
      })
      .then((data) => {
        // console.log(data.data.jwt);
        // console.log(data.data.user);
        return data.data;
      })
      .catch(handleStrapiError);
  }
  createWorkspace(data: types.CreateWorkspaceData) {
    return instance
      .post<strapi.SingleResponse<types.CreateWorkspaceResponse>>('workspaces', { data })
      .then((response) => getMappedResponse(response.data));

  }
  getWorkspacesAll() {
    const workspacesAll = instance
      .get('workspaces')
      .then(function (response) {
        // обработка успешного запроса
        console.log(response.data.data);
      })
      .catch(function (error) {
        // обработка ошибки
        console.log(error);
      });
    return workspacesAll;
  }
  getWorkspacesId(id: string | null) {
    const workspacesId = instance
      .get('workspaces/' + id)
      .then(function (response) {
        // обработка успешного запроса
        console.log(response.data.data);
      })
      .catch(function (error) {
        // обработка ошибки
        console.log(error);
      });
    return workspacesId;
  }
  getWorkspacesByUserId(userId: string) {
    return instance
      .get<strapi.CollectionResponse<Workspace>>(`workspaces/?populate=owner&filters[owner][id][$eq]=${userId}`)
      .then((response) => getMappedResponse(response.data));
  }
  getBoardsAll() {
    const boardsAll = instance
      .get('boards')
      .then(function (response) {
        // обработка успешного запроса
        console.log(response.data.data);
      })
      .catch(function (error) {
        // обработка ошибки
        console.log(error);
      });
    return boardsAll;
  }
  getBoardsId(id: string | null) {
    const boardsId = instance
      .get('boards' + id)
      .then(function (response) {
        // обработка успешного запроса
        console.log(response.data.data);
      })
      .catch(function (error) {
        // обработка ошибки
        console.log(error);
      });
    return boardsId;
  }
  getListsAll() {
    const listsAll = instance
      .get('lists')
      .then(function (response) {
        // обработка успешного запроса
        console.log(response.data.data);
      })
      .catch(function (error) {
        // обработка ошибки
        console.log(error);
      });
    return listsAll;
  }
  getListsId(id: string | null) {
    const listsId = instance
      .get('lists' + id)
      .then(function (response) {
        // обработка успешного запроса
        console.log(response.data.data);
      })
      .catch(function (error) {
        // обработка ошибки
        console.log(error);
      });
    return listsId;
  }
  getTasksAll() {
    const tasksAll = instance
      .get('tasks', {})
      .then(function (response) {
        // обработка успешного запроса
        console.log(response.data.data);
      })
      .catch(function (error) {
        // обработка ошибки
        console.log(error);
      });
    return tasksAll;
  }
  getTasksId(id: string | null) {
    const listsId = instance
      .get('tasks' + id)
      .then(function (response) {
        // обработка успешного запроса
        console.log(response.data.data);
      })
      .catch(function (error) {
        // обработка ошибки
        console.log(error);
      });
    return listsId;
  }
  postTask(task: TaskPostInterface) {
    const taskCreate = instance
    .post('tasks', {
      data: {
        name: task.data.name,
        list: task.data.list,
        order: task.data.order,
      }
    })
    .then((data) => {
      return data.data;
    });

  return taskCreate;
  }
  postList(list: ListPostInterface) {
    const listCreate = instance
    .post('lists', {
      data: {
        name: list.data.name,
        description: list.data.description,
        order: list.data.order,
        board: list.data.board,
      }
    })
    .then((data) => {
      return data.data;
    });

  return listCreate;
  }
}

const api = new Api();
export default api;