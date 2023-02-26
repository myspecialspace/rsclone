import { useAppDispatch } from '../../store';
import { useWorkspace } from '../../store/workspace/hooks';
import { UpDateWorkspace } from '../../store/workspace/types';
import * as workspaceThunks from '../../store/workspace/thunks';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Button, Checkbox, Form, Input, Space } from 'antd';
import { WorkspaseContent } from '../../components/Constants/constant';
import styles from './WorkspaceSettings.module.scss';
import * as routerPaths from '../../router/paths';
export default function WorkspaceSettingsPage() {
  const id = useParams();
  const workspaceId = Number(id.workspaceId);
  const $workspace = useWorkspace();
  const workspaceName = $workspace.data?.name || [];
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [workspaceNew, setWorkspaceNew] = useState({
    workspaceId: workspaceId,
    name: workspaceName,
    description: '',
    isFavorite: false,
  });
  const onUpDateWorkspace = async (data: UpDateWorkspace) => {
    await dispatch(
      workspaceThunks.updateWorkspace({
        name: data.name,
        workspaceId: workspaceId,
        description: workspaceNew.description,
        isFavorite: workspaceNew.isFavorite,
      })
    );
    $workspace.refetch();
  };
  const upDateWorkspace = () => {
    onUpDateWorkspace(workspaceNew);
    navigate(routerPaths.workspaces(workspaceId));
  };
  const handleInput = (e: React.ChangeEvent) => {
    const { name, value } = e.target as HTMLTextAreaElement;
    setWorkspaceNew({ ...workspaceNew, [name]: value });
  };
  const handleFavorite = (e: CheckboxChangeEvent) => {
    setWorkspaceNew({ ...workspaceNew, isFavorite: e.target.checked });
  };
  return (
    <div className={styles.inner}>
      <div className={styles.title}>
        {WorkspaseContent.UPDATE_WORKSPASE_TITLE}
      </div>
      <Form name='workspaceUpdate' className={styles.form}>
        <Form.Item
          label={WorkspaseContent.UPDATE_WORKSPASE}
          name='name'
          rules={[{ required: true, message: 'Please input name workspase!' }]}
        >
          <Input
            placeholder={WorkspaseContent.UPDATE_WORKSPASE_NAME}
            onChange={handleInput}
            name='name'
            value={workspaceNew.name}
          />
        </Form.Item>
        <Form.Item
          label={WorkspaseContent.WORKSPASE_DESCRIPTION}
          name='description'
        >
          <Input
            placeholder={WorkspaseContent.WORKSPASE_DESCRIPTION_PLACEHOLDER}
            onChange={handleInput}
            name='description'
            value={workspaceNew.description}
          />
        </Form.Item>
        <Form.Item
          name='isFavorite'
          valuePropName='checked'
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox onChange={handleFavorite}>
            {WorkspaseContent.CHECK_FAVORITE}
          </Checkbox>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Space wrap>
            <Button type='primary' htmlType='submit' onClick={upDateWorkspace}>
              {WorkspaseContent.BUTTON_OK}
            </Button>
            <Button
              danger
              type='primary'
              onClick={() => navigate(routerPaths.workspaces(workspaceId))}
            >
              {WorkspaseContent.BUTTON_NO}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}
