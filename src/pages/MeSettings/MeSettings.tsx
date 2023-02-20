import { Button, Form, Input, notification, Select, Spin } from 'antd';
import ErrorLine from '../../components/ErrorLine/ErrorLine';
import { RequestStatus } from '../../helpers/api';
import { useAppDispatch } from '../../store';
import { useUser } from '../../store/auth/hooks';
import { editUser } from '../../store/auth/thunks';
import { UserTheme } from '../../types/base';
import styles from './MeSettings.module.scss';

export default function MeSettingsPage() {
  const $user = useUser();
  const dispatch = useAppDispatch();
  const [api, contextHolder] = notification.useNotification();

  if ($user.isError) {
    return <ErrorLine />
  }

  if ($user.isPending) {
    return <Spin />;
  }

  if (!$user.isSuccess) {
    return null;
  }

  const user = $user.data;

  const onFinish = async (values: any) => {

    const res = await dispatch(editUser({
      userId: user.id,
      patch: {
        backgroundColor: values.backgroundColor,
        theme: values.theme,
      },
    }));

    const { requestStatus } = res.meta;

    if (requestStatus === RequestStatus.FULFILLED) {
      api.success({ message: 'Настройки сохранены.' });
    }
    if (requestStatus === RequestStatus.REJECTED) {
      api.error({ message: 'Произошла ошибка.' });
    }
  };

  const onFinishFailed = (error: any) => {

  };


  const themeOptions = Object.values(UserTheme).map((theme) => ({ label: theme, value: theme }));

  return (
    <div className={styles.root}>
      {contextHolder}
      <Form
        name="me-settings"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={user}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Имя"
          name="username"
        >
          <Input disabled={true} />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
        >
          <Input disabled={true} />
        </Form.Item>

        <Form.Item
          label="Цвет"
          name="backgroundColor"
        >
          <Input type="color" />
        </Form.Item>

        <Form.Item
          label="Тема"
          name="theme"
        >
          <Select
            options={themeOptions}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
