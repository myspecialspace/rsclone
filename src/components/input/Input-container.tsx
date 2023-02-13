import { Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { BoardContent } from '../Constants/constant';
import styles from './Input.module.scss';



export default function InputContainer() {
  return (
    <div>
      <Card className={styles.container} size="small">
        <div className={styles.add}><PlusOutlined  className={styles.ico}/>{BoardContent.ADD_TASK}</div>
      </Card>
    </div>
  )
}