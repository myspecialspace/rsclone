
import { Typography } from 'antd';
import styles from './Comment.module.scss';

interface CommentProps {
  taskId: number;
  comment: {
    id: number;
    content: string;
    createdAt: string;
  }
}

export default function Comment(props: CommentProps) {

  let dateAndTime = new Date(props.comment.createdAt);
  let hours = (dateAndTime.getUTCHours().toString().length === 1) ? ('0' + dateAndTime.getUTCHours()) : dateAndTime.getUTCHours();
  let minutes = (dateAndTime.getUTCMinutes().toString().length === 1) ? ('0' + dateAndTime.getUTCMinutes()) : dateAndTime.getUTCMinutes();

  let date = props.comment.createdAt.slice(0, 4) +'.'
  +  props.comment.createdAt.slice(5, 7) + '.'
  + props.comment.createdAt.slice(8, 10) + '    '
  + hours + ':' + minutes;
 
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.ico}></div>
        <Typography>{props.comment.content}</Typography>
      </div>
      <div>
        <div className={styles.date}>{date}</div>
      </div>
    </div>
  )
}