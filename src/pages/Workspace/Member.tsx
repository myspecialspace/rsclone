import { Avatar } from "antd";
import { getBgColor, getFirstChar } from "../../helpers/user";
import { User } from "../../types/user"

interface Props {
  member: User;
}

const Member = ({ member }: Props) => {
  return <Avatar style={{ backgroundColor: getBgColor(member) }} >{getFirstChar(member)}</Avatar>
}

export default Member;