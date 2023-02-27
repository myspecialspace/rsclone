import { useAppDispatch } from '../../store';
import { useWorkspace } from '../../store/workspace/hooks';
import * as workspaceThunks from '../../store/workspace/thunks';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Checkbox, Form, Input, notification, Space, Spin } from 'antd';
import { WorkspaceContent } from '../../components/Constants/constant';
import styles from './WorkspaceSettings.module.scss';
import * as routerPaths from '../../router/paths';
import { useWorkspaces } from '../../store/workspaces/hooks';
import { RequestStatus } from '../../helpers/api';
import ErrorLine from '../../components/ErrorLine/ErrorLine';


interface FormValue {
  name: string;
  description: string;
  isFavorite: boolean;
}

export default function WorkspaceSettingsPage() {
  const id = useParams();
  const workspaceId = Number(id.workspaceId);
  const $workspace = useWorkspace();
  const $workspaces = useWorkspaces();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();


  const onSave = async (formValue: FormValue) => {
    const res = await dispatch(
      workspaceThunks.updateWorkspace({
        ...formValue,
        workspaceId: workspaceId,
      })
    );

    const { requestStatus } = res.meta;
    if (requestStatus === RequestStatus.FULFILLED) {
      api.success({ message: WorkspaceContent.SAVED });
      $workspace.refetch();
      $workspaces.refetch();
      navigate(routerPaths.workspaces(workspaceId));
    }

    if (requestStatus === RequestStatus.REJECTED) {
      api.error({ message: WorkspaceContent.SAVED_ERROR });
    }
  };

  if ($workspace.isInitial) {
    return null;
  }

  if ($workspace.isPending) {
    return <Spin />;
  }

  if ($workspace.isError) {
    return <ErrorLine />;
  }

  const workspace = $workspace.data;

  const initialValues: FormValue = {
    name: workspace.name,
    description: workspace.description,
    isFavorite: workspace.isFavorite,
  };

  return (
    <div className={styles.inner}>
      {contextHolder}
      <div className={styles.title}>
        {WorkspaceContent.UPDATE_WORKSPASE_TITLE}
      </div>
      <Form
        name='workspaceUpdate'
        className={styles.form}
        initialValues={initialValues}
        onFinish={onSave}
      >
        <Form.Item
          label={WorkspaceContent.UPDATE_WORKSPASE}
          name='name'
          rules={[{ required: true, message: 'Please input name workspase!' }]}
        >
          <Input
            placeholder={WorkspaceContent.UPDATE_WORKSPASE_NAME}
          />
        </Form.Item>
        <Form.Item
          label={WorkspaceContent.WORKSPASE_DESCRIPTION}
          name='description'
        >
          <Input
            placeholder={WorkspaceContent.WORKSPASE_DESCRIPTION_PLACEHOLDER}
          />
        </Form.Item>
        <Form.Item
          name='isFavorite'
          valuePropName='checked'
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>
            {WorkspaceContent.CHECK_FAVORITE}
          </Checkbox>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Space wrap>
            <Button type='primary' htmlType='submit'>
              {WorkspaceContent.BUTTON_OK}
            </Button>
            <Button
              danger
              type='primary'
              onClick={() => navigate(routerPaths.workspaces(workspaceId))}
            >
              {WorkspaceContent.BUTTON_NO}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );

}
