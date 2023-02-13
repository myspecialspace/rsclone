import { LoginPageContentRu } from '../Constants/constant';
import styles from './Form.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button, Form, Input } from 'antd';
import Api from '../../http/index';

interface IUser {
  username: string;
  email: string;
  password: string;
  identifier: string;
  id: string | null;
}
const FormLogin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ identifier: '', password: '' });
  const onFinish = (values: IUser) => {
    // console.log('Success:', values);
    Api.postlogin(values).then(
      (data) => {
        localStorage.setItem('jwt', data.jwt);
        localStorage.setItem('userId', data.user.id);
        // выполнение
        navigate(`/boards`);
      },
      (reason) => {
        // отклонение
        navigate(`/registration`);
      }
    );
    setUser({ identifier: '', password: '' });
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={styles.login__content}>
      <h3 className={styles.login__title}>{LoginPageContentRu.LOGIN_TITLE}</h3>
      <Form
        name='login'
        className={styles.form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='on'
      >
        <div className={styles.form__container}>
          <Form.Item
            name='identifier'
            rules={[{ required: true, message: 'Please input your E-mail!' }]}
          >
            <Input
              placeholder={LoginPageContentRu.INPUT_EMAIL}
              className={styles.form__input}
              id='identifier'
              name='identifier'
              required
              value={user.identifier}
            />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              className={styles.form__input}
              placeholder={LoginPageContentRu.INPUT_PASSWORD}
              name='Password'
              id='password'
              value={user.password}
            />
          </Form.Item>
        </div>
        <Button htmlType='submit' id='sign-in' className={styles.login__button}>
          {LoginPageContentRu.LOGIN}
        </Button>
      </Form>
      <div className={styles.login__line_container}>
        <span className={styles.login__line}></span>
      </div>
      <div className={styles.question}>
        <span className={styles.question_has}>
          {LoginPageContentRu.HAVE_ACCOUNT}
        </span>
        <Link to='/registration' className={styles.register}>
          {LoginPageContentRu.REGISTER}
        </Link>
      </div>
    </div>
  );
};
export default FormLogin;
