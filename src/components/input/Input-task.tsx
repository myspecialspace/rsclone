import { Card, Input, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { BoardContent } from '../Constants/constant';
import styles from './Input.module.scss';

const { TextArea } = Input;


export default function InputTask({ setOpen }: any) {
  return (
    <div>
      <div className={styles.task}>
        <TextArea rows={2} placeholder={BoardContent.INPUT_TITLE}/>
      </div>
      <div className={styles.buttons__container}>
      <Button className={styles.button} type="primary" onClick={() => setOpen(true)}>{BoardContent.ADD_TASK}</Button>
      <Button className={styles.button} icon={<CloseOutlined />}></Button>
      </div>
    </div>
  )
}



/*const InputTask: React.FC = () => (
  <>
    <TextArea rows={4} />
    
  </>
);

export default InputTask; */

        /* <Input aria-multiline multiple></Input> 
        
        <Card size="small">
          <TextArea rows={3} placeholder={BoardContent.INPUT_TITLE}/>
        </Card>
        
        */