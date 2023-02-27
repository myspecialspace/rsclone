import { Button, notification, Select, SelectProps } from 'antd';
import { useWorkspace } from '../../store/workspace/hooks';
import { User } from '../../types/base';
import styles from './InviteMembersWorkspace.module.scss';
import { WorkspaceContent, WorkspaceMembersContent } from '../../components/Constants/constant';
import { useAppDispatch } from '../../store';
import { searchUsesrActions } from '../../store/search-users';
import { useSearchUsers } from '../../store/search-users/hooks';
import { useEffect, useState } from 'react';
import UserCard from './UserCard';
import { updateWorkspaceMembers } from '../../store/workspace/thunks';
import { RequestStatus } from '../../helpers/api';
import classNames from 'classnames';

const userToOptions = (users: User[]): SelectValue[] => users.map((user) => {
  return {
    label: user.username,
    value: user.id,
  };
});

type SelectValue = { label: string; value: number };

export interface OnSaveEvent {
  status: `${RequestStatus}`;
}

interface Props {
  className?: string;
  onSave: (event: OnSaveEvent) => any;
  barWidth?: number | string;
}

export default function InviteMembersWorkspace({ className, onSave, barWidth }: Props) {
  const $workspace = useWorkspace();
  const dispatch = useAppDispatch();
  const members = $workspace.data?.members || [];
  const $searchUsers = useSearchUsers();
  const [value, setValue] = useState<SelectValue[]>([]);
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if ($workspace.isSuccess) {
      setValue(userToOptions($workspace.data?.members || []))
    }
  }, [$workspace.isSuccess]);

  const onSearch = (value: string) => {
    dispatch(searchUsesrActions.setSearch(value));
  };
  const onChange = (values: SelectProps['value']) => {
    setValue(values);
  };

  const saveHandler = async () => {
    const members = value.map((item) => item.value);

    const res = await dispatch(updateWorkspaceMembers({
      workspaceId: $workspace.data.id,
      patch: {
        members,
      },
    }));

    const { requestStatus } = res.meta;

    if (requestStatus === RequestStatus.FULFILLED) {
      api.success({ message: WorkspaceMembersContent.SAVED });
    }

    if (requestStatus === RequestStatus.REJECTED) {
      api.error({ message: WorkspaceMembersContent.ERROR });
    }


    onSave({
      status: requestStatus,
    });
  };

  const usersOptions = userToOptions($searchUsers.data);

  return <div className={classNames(styles.workspaceMembers, className)}>
    {contextHolder}
    <div className={styles.inputWrap} style={{ width: barWidth }}>
      <Select
        mode="multiple"
        loading={$searchUsers.isPending}
        showSearch
        value={value}
        placeholder="Search users"
        onSearch={onSearch}
        onChange={onChange}
        onFocus={() => onSearch('')}
        options={usersOptions}
        labelInValue
        filterOption={false}
        className={styles.select}
        
      />
      <Button
        type="primary"
        className={styles.save}
        onClick={saveHandler}>{WorkspaceContent.BUTTON_OK}</Button>
    </div>

    <div className={styles.title}>{WorkspaceMembersContent.MEMBERS}</div>
    <div className={styles.memberTiles}>
      {!members.length && <div>No members</div> }
      {members.map((member) => <UserCard key={member.id} user={member} />)}
    </div>
  </div>
}
