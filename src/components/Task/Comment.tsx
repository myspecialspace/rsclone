
import { Typography } from 'antd';
//import styles from './Task.module.scss'

interface CommentProps {
  taskId: number;
  comment: {
    id: number;
    content: string;
  }
}

export default function Comment(props: CommentProps) {
 
  return (
    <div>
      <Typography>{props.comment.content}</Typography>
    </div>
  )
}