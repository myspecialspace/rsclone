// const axios = require('axios').default;
import axios from 'axios';

interface IUser {
  username: string;
  email: string;
  password: string;
}
export const REACT_APP_API_URL = `http://localhost:1337/`;
const instance = axios.create({
  baseURL: REACT_APP_API_URL,
});

export default class Api {
  static postRegister(values: IUser) {
    const register = instance
      .post('/api/auth/local/register', {
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
}
