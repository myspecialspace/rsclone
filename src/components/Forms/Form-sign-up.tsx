import { SignUpPageContentRu } from '../Constants/constant';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Form.module.scss';
import { useState } from 'react';
import { Button, Form, Input } from 'antd';
import Api from '../../http/index';

interface IUser {
  username: string;
  email: string;
  password: string;
  identifier: string;
}
const FormSignUp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: '', email: '', password: '' });
  const onFinish = (values: IUser) => {
    // console.log('Success:', values);
    Api.postRegister(values).then(
      (data) => {
        console.log('Success:', values);
        console.log(data);
        // выполнение
        navigate(`/boards`);
      },
      (reason) => {
        // отклонение
        navigate(`/`);
      }
    );
    setUser({ username: '', email: '', password: '' });
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={styles.login__content}>
      <h3 className={styles.login__title}>
        {SignUpPageContentRu.SIGN_UP_TITLE}
      </h3>
      <Form
        name='registration'
        className={styles.form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <div className={styles.form__container}>
          <Form.Item
            name='username'
            rules={[{ required: true, message: 'Please input your Name!' }]}
          >
            <Input
              placeholder={SignUpPageContentRu.INPUT_NAME}
              className={styles.form__input}
              id='username'
              name='username'
              value={user.username}
            />
          </Form.Item>
          <Form.Item
            name='email'
            rules={[{ required: true, message: 'Please input your E-mail!' }]}
          >
            <Input
              placeholder={SignUpPageContentRu.INPUT_EMAIL}
              className={styles.form__input}
              id='email'
              name='email'
              value={user.email}
            />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              className={styles.form__input}
              placeholder={SignUpPageContentRu.INPUT_PASSWORD}
              name='Password'
              id='password'
              value={user.password}
            />
          </Form.Item>
        </div>
        <Button htmlType='submit' id='sign-in' className={styles.login__button}>
          {SignUpPageContentRu.SIGN_UP}
        </Button>
      </Form>
      <div className={styles.login__line_container}>
        <span className={styles.login__line}></span>
      </div>
      <div className={styles.question}>
        <span className={styles.question_has}>
          {SignUpPageContentRu.HAVE_ACCOUNT}{' '}
        </span>
        <Link to='/login' className={styles.register}>
          {SignUpPageContentRu.LOGIN}
        </Link>
      </div>
    </div>
  );
};
export default FormSignUp;
