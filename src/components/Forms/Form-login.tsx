import { LoginPageContent } from '../Constants/constant';
import styles from './Form.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd';
import api from '../../api';
import * as routerPaths from '../../router/paths';
import { useAppDispatch } from '../../store';
import { authActions } from '../../store/auth';
import { authSelectors } from '../../store/auth/selectors';
import { useCurrentWorkspaceId } from '../../store/workspace/hooks';
import { useSelector } from 'react-redux';

interface IUser {
  username: string;
  email: string;
  password: string;
  identifier: string;
  id: string | null;
}
const FormLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentWorkspaceId = useCurrentWorkspaceId();
  const userId = useSelector(authSelectors.userId);

  const [error, setError] = useState<{ message: string }>(null!);

  const onFinish = (values: IUser) => {
    setError(null!);

    api.login(values)
      .then((data) => {
        dispatch(authActions.setAuth({
          jwt: data.jwt,
          userId: data.user.id,
        }));
      })
      .catch((err) => {
        setError(err.error);
      })
  };


  useEffect(() => {
    if (userId && currentWorkspaceId) {
      navigate(routerPaths.workspaces(currentWorkspaceId));
    }
  }, [currentWorkspaceId, userId, navigate]);

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={styles.login__content}>
      <h3 className={styles.login__title}>{LoginPageContent.LOGIN_TITLE}</h3>
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
            className={styles.form__item}
          >
            <Input
              placeholder={LoginPageContent.INPUT_EMAIL}
              className={styles.form__input}
              id='identifier'
              name='identifier'
              required
            />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              className={styles.form__input}
              placeholder={LoginPageContent.INPUT_PASSWORD}
              name='Password'
              id='password'
            />
          </Form.Item>
        </div>
        {!!error && <div style={{ 'color': 'red' }}>{error.message}</div>}
        <Button htmlType='submit' id='sign-in' className={styles.login__button}>
          {LoginPageContent.LOGIN}
        </Button>
      </Form>
      <div className={styles.login__line_container}>
        <span className={styles.login__line}></span>
      </div>
      <div className={styles.question}>
        <span className={styles.question_has}>
          {LoginPageContent.HAVE_ACCOUNT}
        </span>
        <Link to={routerPaths.registration()} className={styles.register}>
          {LoginPageContent.REGISTER}
        </Link>
      </div>
    </div>
  );
};
export default FormLogin;
