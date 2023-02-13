// const axios = require('axios').default;
import axios from 'axios';

interface IUser {
  username: string;
  email: string;
  password: string;
  identifier: string;
}
export const REACT_APP_API_URL = `http://localhost:1337/api/`;
export let jwt: string | null = localStorage.getItem('jwt');
const instance = axios.create({
  baseURL: REACT_APP_API_URL,
  headers: { Authorization: `Bearer ` + jwt },
});

export default class Api {
  static postRegister(values: IUser) {
    const register = instance
      .post('auth/local/register', {
        username: values.username,
        email: values.email,
        password: values.password,
      })
      .then((data) => {
        // console.log(data.data.jwt);
        // console.log(data.data.user);
        return data.data;
      });

    return register;
  }
  static postlogin(values: IUser) {
    const login = instance
      .post('auth/local', {
        identifier: values.identifier,
        password: values.password,
      })
      .then((data) => {
        // console.log(data.data.jwt);
        // console.log(data.data.user);
        return data.data;
      });

    return login;
  }
  static getWorkspacesAll() {
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
  static getWorkspacesId(id: string | null) {
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
  static getBoardsAll() {
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
  static getBoardsId(id: string | null) {
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
  static getListsAll() {
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
  static getListsId(id: string | null) {
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
  static getTasksAll() {
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
  static getTasksId(id: string | null) {
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
}
