import { RequestStatus } from "../../helpers/api";
import { useWorkspace } from "../../store/workspace/hooks";
import InviteMembersWorkspace, { OnSaveEvent } from "./InviteMembersWorkspace";
import styles from './WorkspaceMembers.module.scss';

const WorkspaceMembersPage = () => {
  const $workspace = useWorkspace();

  const onSave = ({ status}: OnSaveEvent) => {
    if (status === RequestStatus.FULFILLED) {
      $workspace.refetch();
    }
  }

  return (
    <InviteMembersWorkspace className={styles.root} onSave={onSave} barWidth={'50%'} />
  )
}

export default WorkspaceMembersPage;