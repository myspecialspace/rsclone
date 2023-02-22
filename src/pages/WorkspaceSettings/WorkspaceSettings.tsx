import { useAppDispatch } from '../../store';


export default function WorkspaceSettingsPage() {
  const dispatch = useAppDispatch();
  console.log(dispatch);

  return <div>WorkspaceSettingsPage</div>
}
