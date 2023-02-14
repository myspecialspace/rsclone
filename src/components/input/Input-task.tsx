import { Input, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { BoardContent } from '../Constants/constant';
import styles from './Input.module.scss';

const { TextArea } = Input;

interface InputTaskProps {
  setOpen : React.Dispatch<React.SetStateAction<boolean>>;
}


export default function InputTask(props: InputTaskProps) {
  return (
    <div>
      <div className={styles.task}>
        <TextArea rows={2} placeholder={BoardContent.INPUT_TITLE} onBlur={() => props.setOpen(false)} />
      </div>
      <div className={styles.buttons__container}>
      <Button className={styles.button} type="primary" onClick={() => props.setOpen(false)} >{BoardContent.ADD_TASK}</Button>
      <Button className={styles.button} icon={<CloseOutlined />} onClick={() => props.setOpen(false)} ></Button>
      </div>
    </div>
  )
}
